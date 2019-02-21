import { Request, Response } from '../../interfaces/controllers.interface';

export class BaseController {

  test(req: Request, res: Response) {
    return res.send('Backend working...');
  }

}
