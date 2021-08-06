import { Router } from 'express';
import { githubLogin } from '../../controllers/auth.controller';

const authRouter = Router();

authRouter.get('/auth', githubLogin);

authRouter.get('/github', githubLogin);

export default authRouter;
