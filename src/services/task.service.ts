import mongoose from 'mongoose';
import { Task, TaskStatus } from '../models/task.model.js';
import { AppError } from '../utils/app-error.js';

const formatTask = (task: {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  status: TaskStatus;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}) => ({
  id: task._id,
  title: task.title,
  description: task.description,
  status: task.status,
  userId: task.userId,
  createdAt: task.createdAt,
  updatedAt: task.updatedAt,
});

const assertValidId = (id: string): void => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid task id', 400);
  }
};

export const listTasks = async (userId: string) => {
  const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
  return tasks.map(formatTask);
};

export const getTaskById = async (userId: string, taskId: string) => {
  assertValidId(taskId);
  const task = await Task.findOne({ _id: taskId, userId });
  if (!task) {
    throw new AppError('Task not found', 404);
  }
  return formatTask(task);
};

export const createTask = async (
  userId: string,
  data: { title: string; description?: string; status?: TaskStatus }
) => {
  const task = await Task.create({
    title: data.title,
    description: data.description ?? '',
    status: data.status ?? 'todo',
    userId,
  });
  return formatTask(task);
};

export const updateTask = async (
  userId: string,
  taskId: string,
  data: { title?: string; description?: string; status?: TaskStatus }
) => {
  assertValidId(taskId);

  const updates: { title?: string; description?: string; status?: TaskStatus } = {};
  if (data.title !== undefined) updates.title = data.title;
  if (data.description !== undefined) updates.description = data.description;
  if (data.status !== undefined) updates.status = data.status;

  const task = await Task.findOneAndUpdate({ _id: taskId, userId }, updates, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    throw new AppError('Task not found', 404);
  }
  return formatTask(task);
};

export const deleteTask = async (userId: string, taskId: string) => {
  assertValidId(taskId);
  const task = await Task.findOneAndDelete({ _id: taskId, userId });
  if (!task) {
    throw new AppError('Task not found', 404);
  }
};
