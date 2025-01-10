import express from 'express';
import ClientController from '../controllers/clientController.js';

const router = express.Router();
const controller = new ClientController();

router.get('/', controller.getClients);

router.post('/', controller.create);

router.get('/:clientId', controller.getClientById);

router.patch('/:clientId', controller.update);

router.delete('/:clientId', controller.delete);

export default router;