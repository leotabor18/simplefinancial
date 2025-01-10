import { throwError } from '../middleware/error.js';
import { createTask, deleteTask, getTaskByTaskId, getTasks, updateTask } from '../services/taskService.js';

class TaskController {
  getTasks = (req, res) => {
    const tasks = getTasks();
    res.json({ tasks });
  };

  getTaskById = (req, res) => {
    if (!req.params.taskId) {
      throwError(400, 'Failed to get task. Missing task ID parameter');
    }

    const task = getTaskByTaskId(req.params.taskId);
    res.json(task);
  };

  create = (req, res) => {
    // TODO: Add request body parameter validation
    const task = createTask(req);

    res.json(task);
  };

  update = (req, res) => {
    if (!req.params.taskId) {
      throwError(400, 'Failed to update task. Missing task ID parameter');
    }
    // TODO: Add request body parameter validation

    const task = updateTask(req);
    res.json(task);
  };

  delete = (req, res) => {
    if (!req.params.taskId) {
      throwError(400, 'Failed to delete task. Missing task ID parameter');
    }

    deleteTask(req.params.taskId);

    res.sendStatus(200);
  };
}


export default TaskController;