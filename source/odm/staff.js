// Core
import mongoose from 'mongoose';

// Instruments
import { User } from './users';

// Document shape
const schema = new mongoose.Schema({
    role: {
        type:     String,
        required: true,
    },
});

// Collection
export const staff = User.discriminator('staff', schema);
