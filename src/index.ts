import { env } from './config/env.js';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import healthRouter from './routes/health.route.js';
import authRouter from './routes/auth.route.js';
import { requestLogger } from './middlewares/logger.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';

connectDB();

const app = express();
const PORT = env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/', healthRouter);

app.use('/api/auth', authRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
