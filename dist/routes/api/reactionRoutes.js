import { Router } from "express";
import { createReaction, deleteReaction } from "../../controllers/thoughtsControllers.js";
const router = Router();
router.post('/:thoughtId', createReaction);
router.delete('/:thoughtId/:reactionId', deleteReaction);
export default router;
