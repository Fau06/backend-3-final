import { Router } from 'express';
import { getMockingUsers, postGenerateData } from '../controllers/mocks.controller.js';

const router = Router();

router.get('/mockingusers', getMockingUsers);
router.get('/users', getMockingUsers); // Ruta agregada para el test
router.post('/generateData', postGenerateData);

export default router;