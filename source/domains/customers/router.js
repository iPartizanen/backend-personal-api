// Core
import dg from 'debug';

// Instruments
import { Customers } from '../../controllers';

const debug = dg('router:customers');

export const get = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const model = new Customers();
        const data = await model.getAll();

        res.status(200).json({ ...data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const model = new Customers(req.body);
        const data = await model.create();

        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
