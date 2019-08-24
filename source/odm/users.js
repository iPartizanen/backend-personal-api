// Core
import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
    email: {
        type:   String,
        unique: true,
    },
    primary: Boolean,
}, { _id: false });

const phoneSchema = new mongoose.Schema({
    phone:   String,
    primary: Boolean,
}, { _id: false });

// Parent document shape
const userSchema = new mongoose.Schema({
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
