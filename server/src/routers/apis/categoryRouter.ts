import { Router } from 'express';

const categoryRouter = Router();

categoryRouter.get('/', (req, res) => {
  console.log(req.method);
  res.status(200).json({ message: '' });
});

categoryRouter.post('/', (req, res) => {
  console.log(req.method);
  res.status(200).json({ message: '' });
});

categoryRouter.put('/', (req, res) => {
  console.log(req.method);
  res.status(200).json({ message: '' });
});

categoryRouter.delete('/', (req, res) => {
  console.log(req.method);
  res.status(200).json({ message: '' });
});

export default categoryRouter;
