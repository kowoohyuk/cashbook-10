import { Router } from 'express';

const authRouter = Router();

authRouter.get('/', (req, res) => {
  console.log(req.method);
  res.status(200).json({ message: '' });
});

authRouter.post('/', (req, res) => {
  console.log(req.method);
  res.status(200).json({ message: '' });
});

authRouter.put('/', (req, res) => {
  console.log(req.method);
  res.status(200).json({ message: '' });
});

authRouter.delete('/', (req, res) => {
  console.log(req.method);
  res.status(200).json({ message: '' });
});

export default authRouter;
