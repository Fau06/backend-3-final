import { Router } from 'express';
import { getPets, createPet } from '../controllers/pets.controller.js';

const router = Router();

router.get('/', getPets);
router.post('/', createPet);

export default router;