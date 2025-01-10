import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();
const controller = new UserController();

router.get('/', controller.getUsers);

router.get('/management', controller.getManagementUsers);

router.post('/', controller.create);

router.get('/:userId', controller.getUserById);

router.patch('/:userId', controller.update);

router.delete('/:userId', controller.delete);

// Add routes here

export default router;