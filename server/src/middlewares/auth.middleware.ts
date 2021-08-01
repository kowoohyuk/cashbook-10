import { Router } from 'express';

const authMiddleWare = Router();

authMiddleWare.use('/', (req, res, next) => {
  console.log('authMiddleWare', req.method);
  next();
});

export default authMiddleWare;
