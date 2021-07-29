import express from 'express';

const mainRouter = express();

mainRouter.use('/', (req, res) => {
  console.log(req.method);
  res.json({
    result: '성공',
  });
});

export default mainRouter;
