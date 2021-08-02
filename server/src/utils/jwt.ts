import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { TUser } from '../index';

dotenv.config();

const SECRET = process.env.SECRET || 'develop';

const BEARER = 'Bearer ';

export const generateToken = ({ id, email }: TUser) => {
  return (
    BEARER +
    jwt.sign({ id: String(id), email }, SECRET, {
      expiresIn: '2h',
    })
  );
};

export const verifyToken = (token: string) => {
  try {
    const user = jwt.verify(token, SECRET) as TUser;
    return {
      error: false,
      user,
    };
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
  }
};
