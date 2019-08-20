// Core
import bcrypt from 'bcrypt';

// Instruments
import { customers } from '../odm';
import { NotFoundError } from '../helpers';

export class Customers {
    constructor(data) {
        this.data = data;
    }

    async login() {
        const { email, password } = this.data;
        const customer = await customers
            .findOne({ emails: {$elemMatch: {email} } })
            .select('password hash')
            .lean();
        if (customer) {
            const { hash, password: userPassword } = customer;
            const match = await bcrypt.compare(password, userPassword);
            if (match) {
                return { hash };
            }
        }
    }

    async create() {
        const { password } = this.data;
        if (!password) {
            const initialPassword = '#Aa111111';
            this.data.password = await bcrypt.hash(initialPassword, 5);
        }
        const data = await customers.create(this.data);

        return data;
    }

    async getAll() {
        const data = await customers
            .find({})
            .select('-__v -id')
            .lean();

        return { data };
    }

    async getByHash() {
        const { hash } = this.data;

        const data = await customers
            .findOne({ hash })
            .select('-__v -id')
            .lean();

        if (!data) {
            throw new NotFoundError(`Can not find customer with hash ${hash}`);
        }

        return data;
    }

    async updateByHash() {
        const { hash, payload } = this.data;

        const data = await customers.findOneAndUpdate({ hash }, payload);

        if (!data) {
            throw new NotFoundError(`Can not find customer with hash ${hash}`);
        }

        return data;
    }

    async removeByHash() {
        const { hash } = this.data;

        const data = await customers.findOneAndDelete({ hash });

        if (!data) {
            throw new NotFoundError(`Can not find customer with hash ${hash}`);
        }

        return data;
    }
}
