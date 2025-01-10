import db from 'better-sqlite3-helper';
import moment from 'moment';
import { throwError } from '../middleware/error.js';
import Task from '../model/taskModel.js';

// TODO: Add pagination
const getTasks = () => {
  return db().query('SELECT * FROM task');
}

const getTaskByTaskId = (taskId) => {
  const task = db().queryFirstRow('SELECT * FROM task WHERE taskId=?', taskId);
  if (!task) {
    throwError(404, `Task with task ID ${taskId} not found!`);
  }
  return task;
}

const createTask = (req) => {
  const { body, user: userContext } = req;
  const { id } = userContext;

  // TODO: Add client id
  const taskData = new Task({
    ...body,
    whoAdded: id,
    whoUpdated: id,
    whenAdded: moment().unix(),
    ts: moment().unix(),
  });

  delete taskData.taskId;
  try {
    const rowId = db().insert('task', taskData)
  
    return db().queryFirstRow('SELECT * FROM task WHERE rowid=?', rowId);
  } catch (e) {
    if (e.message.includes('UNIQUE')) {
      throwError(409, e.message)
    }
    throwError(500, e.message)
  }
}

const updateTask = (req) => {
  const { body, user: userContext, params } = req;
  const { id } = userContext;
  const { taskId } = params;

  try {
    let task = db().queryFirstRow('SELECT * FROM task WHERE taskId=?', taskId);
    if (!task) {
      throwError(404, `Task with task ID ${taskId} not found!`);
    }
    
    task = new Task({
      ...task,
      ...body,
      ts: moment().unix(),
      whoUpdated: id
    });
  
    delete task.taskId;
    db().update('task', task, { taskId })
  
    return db().queryFirstRow('SELECT * FROM task WHERE taskId=?', taskId);
  } catch (error) {
    let status = 500
    let message = error
    if (error.status) {
      status = error.status;
      message = error.message
    } 
    throwError(status, message);
  }
}

const deleteTask = (taskId) => {
  let task = db().queryFirstRow('SELECT * FROM task WHERE taskId=?', taskId);
  if (!task) {
    throwError(404, `Task with task ID ${taskId} not found!`);
  }

  try {
    db().delete('task', { taskId });
  } catch (e) {
    if (e.message.includes('UNIQUE')) {
      throwError(409, e.message)
    }
    throwError(500, e.message)
  }
}


export {
  getTasks, createTask, deleteTask, getTaskByTaskId, updateTask
};
