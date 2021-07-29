import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
  console.log(req.method);
  res.status(200).json({ message: '' });
});

userRouter.post('/', (req, res) => {
  console.log(req.method);
  res.status(200).json({ message: '' });
});

userRouter.put('/', (req, res) => {
  console.log(req.method);
  res.status(200).json({ message: '' });
});

userRouter.delete('/', (req, res) => {
  console.log(req.method);
  res.status(200).json({ message: '' });
});

export default userRouter;
