import {
  createTaskService,
  getTasksService,
  updateTaskService,
  deleteTaskService
} from "../services/task.service.js";

export const createTask = async (req, res, next) => {
  try {
    const task = await createTaskService(req.body, req.user.id);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await getTasksService(
      req.user.id,
      Number(page),
      Number(limit)
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await updateTaskService(
      req.params.id,
      req.body,
      req.user.id
    );
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const result = await deleteTaskService(
      req.params.id,
      req.user.id
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
