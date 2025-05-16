import User from "../models/User.js";
import mongoose from 'mongoose';
export const getUsers = async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
export const getUserById = async (req, res) => {
    try {
        console.log(`req params:`, req.params);
        const { id } = req.params;
        const user = await User.findOne({ _id: id })
            .select('-__v');
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'ID inválido' });
        }
        if (!user) {
            res.status(404).json({ message: `No user with that Id` });
        }
        else {
            res.json(user);
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
};
export const createUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        const createUser = await User.create({ username, email });
        res.json(createUser);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
export const updateUser = async (req, res) => {
    try {
        console.log(req.params.id);
        const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true
        }).select('-__v');
        if (!user) {
            res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete({ _id: req.params.id });
        if (!user) {
            return res.status(404).json({ message: 'No user found!.' });
        }
        return res.json({ message: 'Delete succesfull' });
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
