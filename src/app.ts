import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import healthRouter from './routes/health.route.js';
import authRouter from './routes/auth.route.js';
import taskRouter from './routes/task.route.js';
import { requestLogger } from './middlewares/logger.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use('/', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);

app.use(errorHandler);

export default app;
