import { Router } from 'express';
import { adoptPet } from '../controllers/adoption.controller.js';

const router = Router();
router.post('/:uid/:pid', adoptPet);

export default router;