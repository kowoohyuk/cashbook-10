import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const SECRET = process.env.SECRET || 'develop';

const BEARER = 'Bearer ';

type user = {
  id: number;
  email: string;
};

export const generateToken = ({ id, email }: user) => {
  return (
    BEARER +
    jwt.sign({ id: String(id), email }, SECRET, {
      expiresIn: '2h',
    })
  );
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
