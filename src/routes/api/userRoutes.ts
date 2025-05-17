import { Router } from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../../controllers/userController.js'
import { createFriend, deleteFriend } from "../../controllers/friendController.js";

const router = Router();

router.get('/', getUsers)
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
//Add friend
router.post('/:id/friends/:friendId', createFriend)
router.delete('/:id/friends/:friendId', deleteFriend)

export default router;
