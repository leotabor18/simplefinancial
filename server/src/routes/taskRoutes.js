import express from 'express';
import TaskController from '../controllers/taskController.js';

const router = express.Router();
const controller = new TaskController();

router.get('/', controller.getTasks);

router.post('/', controller.create);

router.get('/:taskId', controller.getTaskById);

router.patch('/:taskId', controller.update);

router.delete('/:taskId', controller.delete);

// Add routes here

export default router;