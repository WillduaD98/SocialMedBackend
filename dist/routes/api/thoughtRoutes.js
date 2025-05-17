import { Router } from 'express';
import { getThoughts, getThoughtById, createThought, updateThought, deleteThought } from '../../controllers/thoughtsControllers.js';
const router = Router();
router.get('/', getThoughts);
router.get('/:thoughtId', getThoughtById);
router.post('/:userId', createThought);
router.put('/:id', updateThought);
router.delete('/:thoughtId', deleteThought);
export default router;
