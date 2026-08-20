import { Request, Response, NextFunction } from 'express';
import * as taskService from '../services/task.service.js';

const getUserId = (req: Request): string => req.user!.id;

const getTaskId = (req: Request): string => {
  const id = req.params.id;
  return Array.isArray(id) ? id[0] : id;
};

export const getTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const status = typeof req.query.status === 'string' ? req.query.status : undefined;
    const page = typeof req.query.page === 'number' ? req.query.page : Number(req.query.page);
    const limit = typeof req.query.limit === 'number' ? req.query.limit : Number(req.query.limit);

    const result = await taskService.listTasks(getUserId(req), {
      status: status as 'todo' | 'in-progress' | 'done' | undefined,
      page: Number.isFinite(page) ? page : undefined,
      limit: Number.isFinite(limit) ? limit : undefined,
    });

    res.status(200).json({
      status: 'success',
      results: result.tasks.length,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
      data: result.tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const task = await taskService.getTaskById(getUserId(req), getTaskId(req));
    res.status(200).json({
      status: 'success',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, description, status } = req.body;
    const task = await taskService.createTask(getUserId(req), { title, description, status });
    res.status(201).json({
      status: 'success',
      message: 'Task created successfully',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, description, status } = req.body;
    const task = await taskService.updateTask(getUserId(req), getTaskId(req), {
      title,
      description,
      status,
    });
    res.status(200).json({
      status: 'success',
      message: 'Task updated successfully',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await taskService.deleteTask(getUserId(req), getTaskId(req));
    res.status(200).json({
      status: 'success',
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
