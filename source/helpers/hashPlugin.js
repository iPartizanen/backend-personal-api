// Core
import mongoose from 'mongoose';
const v4 = require('uuid/v4');

export const hashPlugin = (schema) => {
    schema.add({
        hash: {
            type:     String,
            required: true,
            unique:   true,
            index:    true,
            default:  () => v4(),
        },
    });

    schema.pre('save', function(next) {
        this.hash = v4();
        next();
    });
};

mongoose.plugin(hashPlugin);
