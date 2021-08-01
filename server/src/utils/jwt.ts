import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const SECRET = process.env.SECRET || 'develop';

export const generateToken = (payload: string | object | Buffer) => {
  return jwt.sign(payload, SECRET, {
    expiresIn: '2h',
  });
};

export const verifyToken = (token: string) => {
  try {
    return {
      error: false,
      user: jwt.verify(token, SECRET).toString(),
    };
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
  }
};
