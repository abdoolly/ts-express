import { controllersMapper } from './ControllersProvider';
import { app } from '../../app';
import { Application, Request, Response } from 'express';

class RoutesProvider {
  /**
   * @description the main function which do all the magic of applying the router
   * to express
   * @param params
   */
  provide(...params): any {
    let fakeApp: any = new Proxy(
      {},
      {
        get: (target: Application, accessedPropertyName: string) => {
          return (...args: any[]) => {
            // getting the endpoint
            let endpoint = args[0];

            // getting the callback string which is always the last function
            let callbackString = args[args.length - 1];

            // getting middlewares are the params between the first and the last paramters
            let middlewares = [];

            // if the args are bigger than 2 args then this means that there are some middlewares passed
            if (args.length > 2)
              middlewares = args.slice(1, args.length - 1);

            // sending the new layered callback to the express
            return app[accessedPropertyName](endpoint, middlewares, this.shapeTheControllerFunc(callbackString));
          };
        }
      }
    );

    return fakeApp;
  }

  shapeTheControllerFunc(callbackString: string) {
    // validate its a valid callback string
    let splittedCB = callbackString.split('@');

    // validating the string
    if (splittedCB.length !== 2) {
      throw Error(
        `Invalid callback string ${callbackString} it should be "controller@functionName"`
      );
    }

    let [controllerPath, functionName] = splittedCB;

    // if the controller does not exist
    if (!controllersMapper[controllerPath])
      throw Error(`Controller: ${controllerPath} does not exist`);

    if (!controllersMapper[controllerPath][functionName])
      throw Error(`Function: ${functionName} does not exist in Controller: ${controllerPath}`);

    return this.getTheControllerFunc(controllersMapper[controllerPath][functionName], controllersMapper[controllerPath]);
  }

  getTheControllerFunc(controllerClosure: (req: Request, res: Response) => any, controllerContext: any) {
    return (...args) => {

      let [req, res] = args;

      // overriding the res object
      this.overrideRes(res);

      // apply try and catch directly above the controller function
      try {
        // TODO: apply validators here

        // this function could be async or not
        return controllerClosure.bind(controllerContext)(...args);

      } catch (err) {
        console.log('err', err);
        // TODO: global error handler here
      }

    };
  }

  /**
   * @description this function overrides the res.send and res.render to be able to put layer after the controller
   * makes its response
   * @param res
   */
  overrideRes(res: Response) {
    let oldSend = res.send;
    let oldRender: any = res.render;

    // overriding the send function
    res.send = function (...params: any[]) {
      // TODO: call the auditing utility here
      return oldSend.apply(res, params);
    };

    // overriding the render function
    res.render = function (...params: any[]) {
      // TODO: call the auditing utility here
      return oldRender.apply(res, params);
    };

    return res;
  }

  /**
   * detect the function that we should call in the controllerMapper -- checked
   * apply validators on the incoming request -- checked
   * override res.send to make a layer before the response
   * override the res.render to make a layer before the response of a view
   * apply try and catch when actually calling the controller function
   */
}

export let getRouteProvider = new RoutesProvider();
