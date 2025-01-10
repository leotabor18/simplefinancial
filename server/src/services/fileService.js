import db from 'better-sqlite3-helper';
import moment from 'moment';
import { throwError } from '../middleware/error.js';
import Task from '../model/taskModel.js';
import File from '../model/fileModel.js';

// TODO: Add pagination
const getFiles = () => {
  return db().query('SELECT * FROM file');
}

const getFileByFileId = (fileId) => {
  const file = db().queryFirstRow('SELECT * FROM file WHERE fileId=?', fileId);
  if (!file) {
    throwError(404, `File with file ID ${fileId} not found!`);
  }
  return file;
}

const createFile = (req) => {
  const { body, user: userContext } = req;
  const { id } = userContext;

  // TODO: Add client id
  const fileData = new File({
    ...body,
    whoAdded: id,
    whoUpdated: id,
    whenAdded: moment().unix(),
    ts: moment().unix(),
  });

  delete fileData.fileId;
  try {
    const rowId = db().insert('file', fileData)
  
    return db().queryFirstRow('SELECT * FROM file WHERE rowid=?', rowId);
  } catch (e) {
    if (e.message.includes('UNIQUE')) {
      throwError(409, e.message)
    }
    throwError(500, e.message)
  }
}

const updateFile = (req) => {
  const { body, user: userContext, params } = req;
  const { id } = userContext;
  const { fileId } = params;

  try {
    let file = db().queryFirstRow('SELECT * FROM file WHERE fileId=?', fileId);
    if (!file) {
      throwError(404, `File with file ID ${fileId} not found!`);
    }
    
    file = new File({
      ...file,
      ...body,
      ts: moment().unix(),
      whoUpdated: id
    });
  
    delete file.fileId;
    db().update('file', file, { fileId })
  
    return db().queryFirstRow('SELECT * FROM file WHERE fileId=?', fileId);
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

const deleteFile = (fileId) => {
  let file = db().queryFirstRow('SELECT * FROM file WHERE fileId=?', fileId);
  if (!file) {
    throwError(404, `Task with task ID ${fileId} not found!`);
  }

  try {
    db().delete('file', { fileId });
  } catch (e) {
    if (e.message.includes('UNIQUE')) {
      throwError(409, e.message)
    }
    throwError(500, e.message)
  }
}


export {
  getFiles, createFile, deleteFile, getFileByFileId, updateFile
};
