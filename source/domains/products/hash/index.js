// Core
import dg from 'debug';

// Instruments
import { Products } from '../../../controllers';

const debug = dg('router:products:hash');

export const getByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const { productHash } = req.params;
        const model = new Products({ hash: productHash });
        const data = await model.getByHash();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const { productHash } = req.params;
        const model = new Products({ hash: productHash, payload: req.body });
        const data = await model.updateByHash();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const { productHash } = req.params;
        const model = new Products({ hash: productHash });

        await model.removeByHash();

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
