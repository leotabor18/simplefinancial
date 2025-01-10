import express from 'express';
import FormController from '../controllers/formController.js';

const router = express.Router();
const controller = new FormController();

router.get('/', controller.getForms);

router.post('/', controller.create);

router.get('/:formId', controller.getFormById);

router.patch('/:formId', controller.update);

router.delete('/:formId', controller.delete);

// Add routes here

export default router;