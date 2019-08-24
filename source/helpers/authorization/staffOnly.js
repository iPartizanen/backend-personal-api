// Instruments
import { NotFoundError } from '../';

export const staffOnly = (req, res, next) => {
    if (!req.session.user) {
        return next(new NotFoundError('cookie not found', 401));
    }
    const { role } = req.session.user;

    if (role) {
        next();
    } else {
        res.status(401).json({
            message: 'only staff can perform this operation',
        });
    }
};
