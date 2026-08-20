import mongoose from 'mongoose';
import { env } from './env.js';
import { ensureDefaultAdmin } from './seed.js';

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  adminSeeded: boolean;
};

const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cached: MongooseCache = globalWithMongoose.mongooseCache ?? {
  conn: null,
  promise: null,
  adminSeeded: false,
};

globalWithMongoose.mongooseCache = cached;

export const connectDB = async (): Promise<typeof mongoose> => {
  if (cached.conn) {
    if (!cached.adminSeeded) {
      await ensureDefaultAdmin();
      cached.adminSeeded = true;
    }
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(env.MONGO_URI);
  }

  try {
    cached.conn = await cached.promise;
    console.log(`MongoDB Connected: ${cached.conn.connection.host}`);
    if (!cached.adminSeeded) {
      await ensureDefaultAdmin();
      cached.adminSeeded = true;
    }
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error(`Error connecting to MongoDB: ${(error as Error).message}`);
    throw error;
  }
};
