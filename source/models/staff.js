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
        const { hash, password: userPassword, role } = await staff
            .findOne({ emails: {$elemMatch: {email} } })
            .select('password hash role')
            .lean();

        const match = await bcrypt.compare(password, userPassword);

        if (!match) {
            throw new Error('Credentials are not valid');
        }

        return { hash, role };
    }

    async create() {
        const { password } = this.data;
        if (!password) {
            const initialPassword = '#Aa111111';
            this.data.password = await bcrypt.hash(initialPassword, 5);
        }
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
