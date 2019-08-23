// Instruments
import { NotFoundError } from '../';

export const userOnly = (req, res, next) => {
    if (!req.session.user) {
        return next(new NotFoundError('cookie not found', 401));
    }
    const { hash, role } = req.session.user;

    if (role) {
        res.status(401).json({
            message: 'only customers have access to own profiles',
        });
    }

    const { customerHash } = req.params;

    if (hash === customerHash) {
        next();
    } else {
        res.status(401).json({
            message: 'you can work with personal profile only',
        });
    }
};
