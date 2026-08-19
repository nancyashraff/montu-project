import express from 'express';
import { signup, signin } from '../controllers/auth.controller.js';
import { validateSignup, validateSignin } from '../middlewares/validation.middleware.js';

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/signin', validateSignin, signin);

export default router;