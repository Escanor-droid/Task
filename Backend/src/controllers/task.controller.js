import {
  createTaskService,
  getTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService
} from "../services/task.service.js";

/**
 * Create Task
 * POST /api/v1/tasks
 */
export const createTask = async (req, res, next) => {
  try {
    const task = await createTaskService(req.body, req.user.id);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get All Tasks (with pagination)
 * GET /api/v1/tasks?page=1&limit=10
 */
export const getTasks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await getTasksService(req.user.id, page, limit);

    res.status(200).json({
      success: true,
      ...result   // contains: tasks, total, page, pages
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Single Task
 * GET /api/v1/tasks/:id
 */
export const getTaskById = async (req, res, next) => {
  try {
    const task = await getTaskByIdService(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      task
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Task
 * PUT /api/v1/tasks/:id
 */
export const updateTask = async (req, res, next) => {
  try {
    const task = await updateTaskService(
      req.params.id,
      req.body,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Task
 * DELETE /api/v1/tasks/:id
 */
export const deleteTask = async (req, res, next) => {
  try {
    const result = await deleteTaskService(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    next(error);
  }
};