// Core
import mongoose from 'mongoose';
import dg from 'debug';

// Instruments
import { getDbName, getDbUrl } from '../helpers';

const debug = dg('db');
const DB_NAME = getDbName();
const DB_URL = getDbUrl();

const mongooseOptions = {
    promiseLibrary:    global.Promise,
    poolSize:          10,
    keepAlive:         30000,
    connectTimeoutMS:  5000,
    reconnectTries:    Number.MAX_SAFE_INTEGER,
    reconnectInterval: 5000,
    useNewUrlParser:   true,
    useFindAndModify:  false,
    useCreateIndex:    true,
};

// mongodb://username:password@localhost:27017/users
const connection = mongoose.connect(`mongodb://${DB_URL}:27017/${DB_NAME}`, mongooseOptions);

// const __userSchema = new mongoose.Schema({
//     name: String,
// });
// const __productsSchema = new mongoose.Schema({
//     product: String,
// });

// const __user = mongoose.model('customers', __userSchema);
// const __product = mongoose.model('products', __productsSchema);

// try {
//     const __userData = __user.create({
//         name: 'John',
//     });
//     const __productData = __product.create({
//         product: 'Oranges',
//     });

//     console.log(__userData);
//     console.log('================================================');
//     console.log(__productData);
// } catch ({ name, message }) {
//     console.error(`${name}: ${message}`);
// }

connection
    .then(() => {
        debug(`DB '${DB_NAME}' connected`);
    })
    .catch(({ message }) => {
        debug(`DB ${DB_NAME} connectionError: ${message}`);
    });
