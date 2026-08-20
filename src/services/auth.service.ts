import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import { generateToken } from '../utils/jwt.js';
import { AppError } from '../utils/app-error.js';

type UserRole = 'user' | 'admin';

const toAuthResult = (user: {
  _id: { toString(): string };
  name: string;
  email: string;
  role: UserRole;
}) => ({
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
  token: generateToken(user._id.toString(), user.role),
});

const createAccount = async (
  name: string,
  email: string,
  password: string,
  role: UserRole
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('User already exists with this email', 400);
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    passwordHash,
    role,
  });

  return toAuthResult(newUser);
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  requestedRole?: UserRole
) => {
  if (requestedRole === 'admin') {
    const adminExists = await User.exists({ role: 'admin' });
    if (adminExists) {
      throw new AppError('Only an admin can create admin accounts', 403);
    }
  }

  const role = requestedRole === 'admin' ? 'admin' : 'user';
  return createAccount(name, email, password, role);
};

export const registerAdmin = async (name: string, email: string, password: string) => {
  return createAccount(name, email, password, 'admin');
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

  return toAuthResult(user);
};
