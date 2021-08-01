import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const SECRET = process.env.SECRET || 'develop';

const generateToken = (payload: string | object | Buffer) =>
  jwt.sign(payload, SECRET, {
    algorithm: 'HS256',
    expiresIn: '2h',
  });

const verifyToken = (token: string) => {
  try {
    const decodedUser = jwt.verify(token, SECRET);
    return decodedUser;
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

export const token = {
  generateToken,
  verifyToken,
};
