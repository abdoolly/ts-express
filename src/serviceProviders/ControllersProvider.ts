import { sync as globSync } from 'glob';

export class ControllerProvider {
  /**
   * controllers place relative from this place
   */
  constrollersDirectory = './src/controllers/';
  controllersExtension = '.ts';

  provide() {
    // getting all controllers and their directory
    let controllers = globSync(
      `${this.constrollersDirectory}/**/**${this.controllersExtension}`
    );

    // making the controller Mappers
    return this.doPathOperations(controllers);
  }

  private doPathOperations(controllerPaths: string[]) {
    const fullPathWithoutExtension = [];
    const controllerMapper = {};

    for (let path of controllerPaths) {
      // remove path from path
      path = this.removeExtensionsInFilePath(path);

      // push to the full array path
      fullPathWithoutExtension.push(path);

      // make the controller mapper property name
      const mapperProperty = this.removeDirectoryPathFromControllerPath(path);

      // getting the controller module
      // if the controller does not exist we need to say
      controllerMapper[mapperProperty] = this.makeMapperPropertyValue(path);
    }

    return controllerMapper;
  }

  /**
   * @description get a file path and remove the extension .ts extension
   * @param filePath
   */
  private removeExtensionsInFilePath(filePath: string) {
    const removeDotSlash = new RegExp(/\.\//);
    const removeExtension = new RegExp(`${this.controllersExtension}`);
    return filePath.replace(removeExtension, '').replace(removeDotSlash, '');
  }

  /**
   * @description remove the ./ and the main directory path from the controllers paths
   * @param filePath
   */
  private removeDirectoryPathFromControllerPath(filePath: string) {
    // removing the dot from the directory name
    const removeDotSlash = new RegExp(/\.\//);
    const directory = this.constrollersDirectory.replace(removeDotSlash, '');

    const removeDirectoryPath = new RegExp(`${directory}`);
    // removing the main directory name from the controllers paths
    // and removing the ./ from the path if they exist
    return filePath.replace(removeDirectoryPath, '');
  }

  /**
   * @description make a new object from the controller and return it
   * to be put in the controllers mapper object
   * @param filePath
   */
  private makeMapperPropertyValue(filePath: string) {
    // split the path
    let splitted = filePath.split('/');

    // get the controller name from the path
    let controllerName = splitted[splitted.length - 1];

    try {
      // require the controller dynamically
      let controller = require(`../../${filePath}`)[`${controllerName}`];
      // returning a new object of the controller for the controllers mapper
      return new controller();
    } catch (err) {
      console.log('err', err);
    }
  }
}

/**
 * @description we run that provider here to generate the controller object mapper
 * and cache the result so its not recalculated again
 */
let controllersProvider = new ControllerProvider();
export let controllersMapper = controllersProvider.provide();
