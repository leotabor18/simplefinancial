import { throwError } from '../middleware/error.js';
import { createFile, deleteFile, getFileByFileId, getFiles, updateFile } from '../services/fileService.js';

class FileController {
  getFiles = (req, res) => {
    const files = getFiles();
    res.json({ files });
  };

  getFileById = (req, res) => {
    if (!req.params.fileId) {
      throwError(400, 'Failed to get file. Missing file ID parameter');
    }

    const file = getFileByFileId(req.params.fileId);
    res.json(file);
  };

  create = (req, res) => {
    // TODO: Add request body parameter validation
    const file = createFile(req);

    res.json(file);
  };

  update = (req, res) => {
    if (!req.params.fileId) {
      throwError(400, 'Failed to update file. Missing file ID parameter');
    }
    // TODO: Add request body parameter validation
    const file = updateFile(req);
    res.json(file);
  };

  delete = (req, res) => {
    if (!req.params.fileId) {
      throwError(400, 'Failed to delete file. Missing file ID parameter');
    }

    deleteFile(req.params.fileId);

    res.sendStatus(200);
  };
}


export default FileController;