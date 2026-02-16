import Task from "../models/task.model.js";

/**
 * Create a new task
 */
export const createTaskService = async (data, userId) => {
  const task = await Task.create({
    title: data.title,
    completed: data.completed || false,
    user: userId
  });

  return task;
};

/**
 * Get all tasks for a user (with pagination)
 */
export const getTasksService = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const tasks = await Task.find({ user: userId })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Task.countDocuments({ user: userId });

  return {
    tasks,
    total,
    page,
    pages: Math.ceil(total / limit)
  };
};

/**
 * Get single task
 */
export const getTaskByIdService = async (taskId, userId) => {
  const task = await Task.findOne({
    _id: taskId,
    user: userId
  });

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};

/**
 * Update task
 */
export const updateTaskService = async (taskId, data, userId) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    data,
    { new: true }
  );

  if (!task) {
    throw new Error("Task not found or unauthorized");
  }

  return task;
};

/**
 * Delete task
 */
export const deleteTaskService = async (taskId, userId) => {
  const task = await Task.findOneAndDelete({
    _id: taskId,
    user: userId
  });

  if (!task) {
    throw new Error("Task not found or unauthorized");
  }

  return { message: "Task deleted successfully" };
};
