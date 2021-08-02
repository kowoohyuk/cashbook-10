import { Router } from 'express';
import {
  postSignInUser,
  postSignUpUser,
} from '../../controllers/user.controller';

const userRouter = Router();

userRouter.post('/signin', postSignInUser);
userRouter.post('/signup', postSignUpUser);

export default userRouter;
