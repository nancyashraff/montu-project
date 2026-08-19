import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service.js';

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.registerUser(name, email, password);

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

export const signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);

    res.status(200).json({
      status: 'success',
      message: 'Logged in successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(401).json({ status: 'fail', message: error.message });
  }
};