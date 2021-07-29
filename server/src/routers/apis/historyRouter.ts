import { Router } from 'express';

const historyRouter = Router();

historyRouter.get('/', (req, res) => {
  console.log(req.method);
  res.status(200).json({ message: '' });
});

historyRouter.post('/', (req, res) => {
  console.log(req.method);
  res.status(200).json({ message: '' });
});

historyRouter.put('/', (req, res) => {
  console.log(req.method);
  res.status(200).json({ message: '' });
});

historyRouter.delete('/', (req, res) => {
  console.log(req.method);
  res.status(200).json({ message: '' });
});

export default historyRouter;
