import { Schema, model, Document, ObjectId, Types } from 'mongoose';

interface IThoughts extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: IReaction[]; //como seria ??
};

interface IReaction extends Document{
    reactionId: ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Date | string
}


const reactionSchema = new Schema<IReaction>(
    {
        reactionId:  {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 200
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp: Date) => timestamp.toLocaleString()
        }
    }
)

const thoughtSchema = new Schema<IThoughts>(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    }
)

thoughtSchema 
    .virtual('thoughtsCount')
    .get(function (this: any) {
        return this.thoughts.length
    });

// Initialize Post model
const Thought = model('Thought', thoughtSchema);

export default Thought
