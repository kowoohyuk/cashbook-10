import { Router } from 'express';

const authRouter = Router();

authRouter.use('/', (req, res, next) => {
  next();
});

export default authRouter;
