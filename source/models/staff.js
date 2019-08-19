// Core
import bcrypt from 'bcrypt';

// Instruments
import { staff } from '../odm';

export class Staff {
    constructor(data) {
        this.data = data;
    }

    async login() {
        const { email, password } = this.data;
        const { hash, password: userPassword } = await staff
            .findOne({ emails: {$elemMatch: {email} } })
            .select('password hash')
            .lean();

        const match = await bcrypt.compare(password, userPassword);

        if (!match) {
            throw new Error('Credentials are not valid');
        }

        return hash;
    }

    async create() {
        const data = await staff.create(this.data);

        return data;
    }

    async getAll() {
        const data = await staff
            .find({})
            .select('-__v -id')
            .lean();

        return { data };
    }
}
