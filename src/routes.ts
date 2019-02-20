import { NextFunction, Request, Response, Router } from 'express';
import * as pino from 'pino';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  print.debug({a:2,b:{c:{d:5}}});
  return res.send({ Hello: 'All GOOD' });
});

router.get('/test', async (req: Request, res: Response, next: NextFunction) => {
  return res.send({ Hello: 'All GOOD' });
});

export = router;
