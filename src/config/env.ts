import dotenv from 'dotenv';
import { randomBytes } from 'crypto';
import { appendFileSync, existsSync, readFileSync } from 'fs';
import path from 'path';

dotenv.config();

const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
};

const envFilePath = path.resolve(process.cwd(), '.env');

const NODE_ENV = process.env.NODE_ENV || 'development';

const getOrCreateJwtSecret = (): string => {
  const existing = process.env.JWT_SECRET;
  if (existing) {
    return existing;
  }

  if (NODE_ENV !== 'development') {
    throw new Error('JWT_SECRET is required');
  }

  const secret = randomBytes(64).toString('hex');
  process.env.JWT_SECRET = secret;

  const line = `JWT_SECRET=${secret}\n`;

  try {
    if (existsSync(envFilePath)) {
      const current = readFileSync(envFilePath, 'utf8');
      if (!/^JWT_SECRET=/m.test(current)) {
        appendFileSync(envFilePath, current.endsWith('\n') ? line : `\n${line}`);
      }
    } else {
      appendFileSync(envFilePath, line);
    }
    console.log('JWT_SECRET was missing; generated a new secret and saved it to .env');
  } catch {
    console.warn('JWT_SECRET was missing; generated a temporary secret (could not write .env)');
  }

  return secret;
};

export const env = {
  PORT: process.env.PORT || '3000',
  NODE_ENV,
  MONGO_URI: requireEnv('MONGO_URI'),
  JWT_SECRET: getOrCreateJwtSecret(),
};
