// Core
import mongoose from 'mongoose';

// Document shape
const schema = new mongoose.Schema({
    title: {
        type:     String,
        required: true,
    },
    description: String,
    price:       {
        type:     Number,
        required: true,
        min:      [ 0, 'The price should be non-negative value' ],
    },
    discount: {
        type: Number,
        min:  [ 0, 'The discount should be non-negative value' ],
        max:  [ 50, 'Maximum discount is 50' ],
    },
    total: {
        type:     Number,
        required: true,
    },
    created: {
        type:    Date,
        default: () => new Date(),
    },
    modified: {
        type:    Date,
        default: () => new Date(),
    },
});

// schema.index({ hash: 1 }, { name: 'hash' });

// Collection
export const products = mongoose.model('products', schema);

// products.createIndexes();
