import { Schema, model } from 'mongoose';
import validator from 'validator';
//Schema to create User model
const userSchema = new Schema({
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
            validator: (str) => validator.isEmail(str),
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
}, {
    toJSON: {
        virtuals: true
    },
    id: false
});
userSchema
    .virtual('friendCount')
    .get(function () {
    return this.friends.length;
});
// Initialize Post model
const User = model('User', userSchema);
export default User;
