import { Router } from 'express';

const paymentRouter = Router();

paymentRouter.get('/', (req, res) => {
  console.log(req.method);
  res.status(200).json({ message: '' });
});

paymentRouter.post('/', (req, res) => {
  console.log(req.method);
  res.status(200).json({ message: '' });
});

paymentRouter.put('/', (req, res) => {
  console.log(req.method);
  res.status(200).json({ message: '' });
});

paymentRouter.delete('/', (req, res) => {
  console.log(req.method);
  res.status(200).json({ message: '' });
});

export default paymentRouter;
