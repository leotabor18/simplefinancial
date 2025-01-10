import express from 'express';
import BusinessController from '../controllers/businessController.js';

const router = express.Router();
const controller = new BusinessController();

router.get('/', controller.getBusinesses);

router.post('/', controller.create);

router.get('/:businessId', controller.getBusinessById);

router.get('/:businessId/clients', controller.getBusinessClients);

router.patch('/:businessId', controller.update);

router.delete('/:businessId', controller.delete);

// Add routes here

export default router;