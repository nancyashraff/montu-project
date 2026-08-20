import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';

export const protect = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({
      status: 'fail',
      message: 'Not authorized. Provide a Bearer token.',
    });
    return;
  }

  try {
    const token = authHeader.split(' ')[1];
    req.user = verifyToken(token);
    next();
  } catch {
    res.status(401).json({
      status: 'fail',
      message: 'Invalid or expired token',
    });
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        status: 'fail',
        message: 'Only an admin can perform this action',
      });
      return;
    }
    next();
  };
};
