import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const JWT_EXPIRES_IN = '1d';

export interface TokenPayload {
  id: string;
  role: string;
}

export const generateToken = (userId: string, role: string): string => {
  return jwt.sign({ id: userId, role }, env.JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
};
