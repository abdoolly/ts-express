import { NextFunction, Request, Response, Router } from 'express';
const router = Router();


router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    return res.send({ 'Hello': 'All GOOD' });
});

export = router;


