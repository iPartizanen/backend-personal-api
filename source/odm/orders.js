// Core
import mongoose from 'mongoose';

// Instruments
import { products, customers } from './';

// Document shape
const schema = new mongoose.Schema({
    uid: {
        type:     mongoose.SchemaTypes.ObjectId,
        ref:      customers,
        required: true,
    },
    pid: {
        type:     mongoose.SchemaTypes.ObjectId,
        ref:      products,
        required: true,
    },
    count: {
        type:     Number,
        required: true,
    },
    comment: String,
    created: {
        type:    Date,
        default: () => new Date(),
    },
    modified: Date,
});

// Collection
export const orders = mongoose.model('orders', schema);
