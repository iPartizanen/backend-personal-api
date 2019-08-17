// Core
import mongoose from 'mongoose';

// Instruments
import { User } from './users';

// Document shape
const schema = new mongoose.Schema({
    city: {
        type: String,
    },
    country: {
        type: String,
    },
});

schema.index({ city: 1 }, { name: 'city' });
schema.index({ country: 1 }, { name: 'country' });
schema.index({ 'name.first': 'text', 'name.last': 'text', city: 'text', country: 'text' });

// Collection
export const customers = User.discriminator('customer', schema);

customers.createIndexes();
