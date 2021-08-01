import { Router } from 'express';
import {
  postSignInUser,
  postSignUpUser,
} from '../../controllers/user.controller';

const userRouter = Router();

userRouter.post('/signInUser', postSignInUser);
userRouter.post('/signUpUser', postSignUpUser);

export default userRouter;
