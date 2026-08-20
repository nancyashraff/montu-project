import express from 'express';
import { signup, signin, createAdmin, getMe } from '../controllers/auth.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';
import { validateSignup, validateSignin } from '../middlewares/validation.middleware.js';

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/signin', validateSignin, signin);
router.get('/me', protect, getMe);
router.post('/admins', protect, restrictTo('admin'), validateSignup, createAdmin);

export default router;
