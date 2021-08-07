import { Router } from 'express';
import { githubAuth, githubLogin } from '../../controllers/auth.controller';

const authRouter = Router();

authRouter.get('/login', githubLogin);

authRouter.get('/github', githubAuth);

export default authRouter;
