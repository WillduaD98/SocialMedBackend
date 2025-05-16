import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/challenge17');

export default mongoose.connection;