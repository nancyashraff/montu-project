import { Router } from 'express';
import { getHealthStatus } from '../controllers/health.controller.js';

const router = Router();

router.get('/ping', getHealthStatus);

export default router;