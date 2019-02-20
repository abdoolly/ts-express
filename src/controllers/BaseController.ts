import { Request, Response } from '../../intefaces/controllers.interface';

export class BaseController {

  test(req: Request, res: Response) {
    return res.send('Backend working...');
  }

}
