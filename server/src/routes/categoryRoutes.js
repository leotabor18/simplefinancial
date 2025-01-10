import express from 'express';
import CategoryController from '../controllers/categoryController.js';

const router = express.Router();
const controller = new CategoryController();

router.get('/', controller.getCategories);

router.post('/', controller.create);

router.get('/:categoryId', controller.getCategoryById);

router.patch('/:categoryId', controller.update);

router.delete('/:categoryId', controller.delete);

// Add routes here

export default router;