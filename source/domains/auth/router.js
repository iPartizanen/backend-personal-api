// Core
import dg from 'debug';

// Instruments
import { Staff, Customers } from '../../controllers';

const debug = dg('router:auth');

export const post = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        if (!req.headers.authorization) {
            throw new Error('credentials are not valid');
        }

        const [ , credentials ] = req.headers.authorization.split(' ');
        const [ email, password ] = Buffer.from(credentials, 'base64')
            .toString()
            .split(':');

        const staff = new Staff({ email, password });
        let userAuth = await staff.login();
        if (!userAuth) {
            const customers = new Customers({ email, password });
            userAuth = await customers.login();
            if (!userAuth) {
                throw new Error('credentials are not valid');
            }
        }
        req.session.user = userAuth;
        res.sendStatus(204);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
