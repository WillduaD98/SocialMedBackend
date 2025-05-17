import { Schema, model, Document } from 'mongoose';
import validator from 'validator';

interface IUser extends Document {
    username: string,
    email: string,
    thoughts?: any,
    friends?: any,
}

//Schema to create User model
const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (str: string) =>  validator.isEmail(str),
                message: props => `${props.value} its not a valid email.`
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

userSchema
    .virtual('friendCount')
    .get(function (this: any) {
        return this.friends?.length || 0
    });

// Initialize Post model
const User = model('User', userSchema);

export default User;
