// Core
import mongoose from 'mongoose';
import v4 from 'uuid/v4';

const emailSchema = new mongoose.Schema({
    email: {
        type:   String,
        unique: true,
    },
    primary: Boolean,
});

const phoneSchema = new mongoose.Schema({
    phone:   String,
    primary: Boolean,
});

// Parent document shape
const userSchema = new mongoose.Schema({
    hash: {
        type:     String,
        required: true,
        unique:   true,
        index:    true,
        default:  () => v4(),
    },
    name: {
        first: {
            type:     String,
            required: true,
        },
        last: {
            type:     String,
            required: true,
        },
    },
    emails:   [ emailSchema ],
    phones:   [ phoneSchema ],
    password: {
        type:   String,
        select: false,
    },
    created: {
        type:    Date,
        default: () => new Date(),
    },
    modified: Date,
});

userSchema.index({ 'name.first': 1, 'name.last': 1 }, { name: 'flName' });

// Parent model
export const User = mongoose.model('users', userSchema);
