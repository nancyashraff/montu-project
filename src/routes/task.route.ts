import express from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/task.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import {
  validateCreateTask,
  validateUpdateTask,
  validateTaskId,
} from '../middlewares/validation.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getTasks);
router.post('/', validateCreateTask, createTask);
router.get('/:id', validateTaskId, getTask);
router.put('/:id', validateTaskId, validateUpdateTask, updateTask);
router.delete('/:id', validateTaskId, deleteTask);

export default router;