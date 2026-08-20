import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import { generateToken } from '../utils/jwt.js';

export const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    passwordHash,
    role: 'user',
  });

  const token = generateToken(newUser._id.toString(), newUser.role);

  return {
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
    token,
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordMatch) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user._id.toString(), user.role);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};