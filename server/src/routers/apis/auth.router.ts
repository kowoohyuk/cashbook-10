import { Router } from 'express';
import { getUserById } from '../../controllers/user.controller';

const authRouter = Router();

authRouter.get('/auth', getUserById);

export default authRouter;
