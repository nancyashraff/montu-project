import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import { env } from './env.js';

export const ensureDefaultAdmin = async (): Promise<void> => {
  const email = env.ADMIN_EMAIL;
  const password = env.ADMIN_PASSWORD;

  if (!email || !password) {
    return;
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  await User.create({
    name: 'Default Admin',
    email,
    passwordHash,
    role: 'admin',
  });

  console.log(`Default admin ready. Sign in with ${email}`);
};
