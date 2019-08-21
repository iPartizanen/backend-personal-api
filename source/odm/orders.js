// Core
import mongoose from 'mongoose';
import v4 from 'uuid/v4';

// Instruments
import { products, customers } from './';

// Document shape
const schema = new mongoose.Schema({
    hash: {
        type:     String,
        required: true,
        unique:   true,
        index:    true,
        default:  () => v4(),
    },
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
