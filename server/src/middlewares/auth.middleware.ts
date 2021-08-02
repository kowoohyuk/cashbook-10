import { Request, Response, Router } from 'express';
import { httpResponse, STATUS } from '../controllers';
import { generateToken, verifyToken } from '../utils/jwt';

const authMiddleWare = Router();

const MESSAGE = {
  FAIL_AUTH: '인증이 필요합니다.',
  FAIL_VALID: '유효하지 않은 토큰입니다.',
};

const SKIP_PATH = ['/api/user/signup', '/api/user/signin', '/api/auth'];
const SKIP_METHOD = ['GET'];

const checkSkipVerify = (method: string, path: string): boolean =>
  SKIP_METHOD.includes(method) || SKIP_PATH.includes(path);

authMiddleWare.use('/', (req: Request, res: Response, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    if (checkSkipVerify(req.method, req.path)) {
      return next();
    }
    return httpResponse(res, STATUS.FAIL_ALERT, { message: MESSAGE.FAIL_AUTH });
  }
  const verify = verifyToken(authorization.split('Bearer ')[1]);
  if (verify?.error) {
    return httpResponse(res, STATUS.FAIL_ALERT, {
      message: MESSAGE.FAIL_VALID,
    });
  }
  req.user = verify.user;
  next();
});

export default authMiddleWare;
