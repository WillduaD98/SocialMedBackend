import User from '../models/User.js'
import { Request, Response } from 'express';

export const createFriend = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { friendId } = req.params
        console.log(`${id} user id added.`)
        console.log(`${friendId} added.`)
        

        const user = await User.findById(id);
        
        const friend = await User.findById(friendId);

        if (!user) { 
            return res.status(404).json({ message: `User not found.`})
        }
        if (!friend) { 
            return res.status(404).json({ message: `Friend not found.`})
        }

        //Verify if its already included
        if (user.friends.includes(friendId)) {
            return res.status(400).json({ message: `He is already a friend.`})
        }

        user.friends.push(friend);
        await user.save();

        const updatedUser = await User.findById(id).populate('friends', 'username')
        console.log('updatedUser:', updatedUser); 

        return res.status(200).json({ 

            user: updatedUser
        })
        console.log('✅ Respuesta enviada correctamente');


    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
};

export const deleteFriend = async (req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        console.log(`user id: ${id}`);

        const { friendId } = req.params;
        console.log(`friend id: ${friendId}`);

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: `user not found!`})
        }
        if (!friendId) {
            return res.status(404).json({ message: `friendId not found.`})
        }

        if (!user.friends.includes(friendId)) {
            return res.status(400).json({ message: `He is already not in the user friends.`})
        }
        // await user?.updateOne(
        //     {_id: id},
        //     {$pull: {friends: friendId}}
        // );
        user.friends.pull(friendId);
        await user.save();
        return res.status(200).json({ message: `Friend deleted succesfuly!. `})
    } catch (error) {
        return res.status(500).json({ err: error})
    }
}