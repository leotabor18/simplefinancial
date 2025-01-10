import express from 'express';
import userRoutes from './userRoutes.js';
import clientRoutes from './clientRoutes.js';
import taskRoutes from './taskRoutes.js';
import fileRoutes from './fileRoutes.js';
import formRoutes from './formRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import businessRoutes from './businessRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);

router.use('/clients', clientRoutes);

router.use('/tasks', taskRoutes);

router.use('/files', fileRoutes);

router.use('/categories', categoryRoutes);

router.use('/businesses', businessRoutes);

router.use('/forms', formRoutes);

// Add routes here

export default router;