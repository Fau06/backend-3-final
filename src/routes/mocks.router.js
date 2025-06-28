import { Router } from 'express';
import { getMockingUsers, postGenerateData } from '../controllers/mocks.controller.js';

const router = Router();

router.get('/mockingusers', getMockingUsers);
router.post('/generateData', postGenerateData);

export default router;