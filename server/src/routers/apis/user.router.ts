import { Router } from 'express';
import {
  postSignInUser,
  postSignUpUser,
  getCheckExistUser,
} from '../../controllers/user.controller';

const userRouter = Router();

userRouter.post('/signin', postSignInUser);
userRouter.post('/signup', postSignUpUser);
userRouter.get('/exist', getCheckExistUser);

export default userRouter;
