import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';

export default app;

if (!process.env.VERCEL) {
  const PORT = env.PORT || '3000';

  const start = async (): Promise<void> => {
    try {
      await connectDB();
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT} (${env.NODE_ENV})`);
      });
    } catch {
      process.exit(1);
    }
  };

  start();
}
