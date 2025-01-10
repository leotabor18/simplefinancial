import express from 'express';
import FileController from '../controllers/fileController.js';

const router = express.Router();
const controller = new FileController();

router.get('/', controller.getFiles);

router.post('/', controller.create);

router.get('/:fileId', controller.getFileById);

router.patch('/:fileId', controller.update);

router.delete('/:fileId', controller.delete);

// Add routes here

export default router;