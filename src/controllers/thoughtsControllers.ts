import Thought from "../models/Thought.js";
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from "../models/User.js";

export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getThoughtById =  async (req: Request, res: Response) => {
    try {
        const { thoughtId } = req.params
        if (!thoughtId) {
            return res.status(404).json({ message: `Thought Id missing!`})
        }
        if (!mongoose.Types.ObjectId.isValid(thoughtId)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const thought = await Thought.findById(thoughtId);
        if (!thought) {
            return res.status(404).json({ message: `Thought Id not found!. `})
        }

        return res.status(200).json(thought)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const createThought = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const { thoughtText } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json(`user not found`);
        }

        const username = user?.username;

        const thought = await Thought.create({
            thoughtText,
            username
        })


        return res.status(200).json(`Thought created succesfully! : ${thought}`)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updateThought = async (req: Request, res: Response) => {
    try {
        
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
        if(!thought) {
            return res.status(404).json({ message: `Thought not found`})
        }
        return res.json(thought)
    } catch (error) {
        return res.status(500).json({message: `Error Updating User`})
    }
}

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndDelete({_id: req.params.thoughtId})
        if (!thought) {
            return res.status(404).json(`Thought Id not found`)
        }
        return res.json({message: `Delete succesfull: ${thought}`})
    } catch (error) {
        return res.status(500).json({ message: `Error deleting Thought`})
    }
}

export const createReaction = async (req: Request, res: Response) => {
    try {
        const { thoughtId }  = req.params
        const reaction = req.body

        const thought = await Thought.findById(thoughtId)
        if (!thought) {
            return res.status(404).json({ message: `Thought not found to add reaction.`})
        }

        thought.reactions?.push(reaction)
        await thought.save();
        return res.status(200).json({ message: `reaction created!`})
    } catch (error) {
        return res.status(500).json({ message: `Error creating reaction`})
    }
}

export const deleteReaction = async (req: Request, res: Response) => {
    try {
      const { thoughtId, reactionId } = req.params;
  
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found!' });
      }
  
      // Verifica que la reacción exista
      const index = thought.reactions.findIndex(
        (r: any) => r._id?.toString() === reactionId
      );
  
      if (index === -1) {
        return res.status(400).json({ message: 'Reaction not found or already deleted.' });
      }
  
      // Elimina la reacción manualmente
      thought.reactions.splice(index, 1);
      await thought.save();
  
      return res.status(200).json({ message: 'Reaction deleted successfully!' });
    } catch (error: any) {
      console.error('Error deleting reaction:', error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
  