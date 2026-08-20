import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';

const handleValidation = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export const validateSignup = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 50 }).withMessage('Name cannot exceed 50 characters'),
  body('email')
    .trim()
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role')
    .optional()
    .isIn(['user', 'admin']).withMessage('Role must be either user or admin'),
  handleValidation,
];

export const validateSignin = [
  body('email')
    .trim()
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required'),
  handleValidation,
];

export const validateCreateTask = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('status')
    .optional()
    .isIn(['todo', 'in-progress', 'done']).withMessage('Status must be todo, in-progress, or done'),
  handleValidation,
];

export const validateUpdateTask = [
  body('title')
    .optional()
    .trim()
    .notEmpty().withMessage('Title cannot be empty')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('status')
    .optional()
    .isIn(['todo', 'in-progress', 'done']).withMessage('Status must be todo, in-progress, or done'),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.title === undefined && req.body.description === undefined && req.body.status === undefined) {
      res.status(400).json({ status: 'fail', message: 'Provide at least one field to update' });
      return;
    }
    next();
  },
  handleValidation,
];

export const validateTaskId = [
  param('id').isMongoId().withMessage('Invalid task id'),
  handleValidation,
];
