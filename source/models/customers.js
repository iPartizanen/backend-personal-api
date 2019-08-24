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
        let password = this.data.password; // should be encrypted
        if (!password) {
            password = await bcrypt.hash('#Aa111111', 5);
        }

        const [ first, last ] =  this.data.name.split(' ');
        const newCustomer = {
            name: {
                first,
                last,
            },
            phones: [
                {
                    phone:   this.data.phone,
                    primary: true,
                },
            ],
            emails: [
                {
                    email:   this.data.email,
                    primary: true,
                },
            ],
            password,
            city:    this.data.city,
            country: this.data.country,
        };

        const { hash } = await customers.create(newCustomer);

        return { hash };
    }

    async getAll() {
        const data = await customers
            .find({})
            .select('-__v -_id -__t -hash -created -modified -city -country')
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

    async getById() {
        const { _id } = this.data;

        const data = await customers
            .findOne({ _id })
            .select('-__v -id')
            .lean();

        if (!data) {
            throw new NotFoundError(`Can not find customer with ID=${_id}`);
        }

        return data;
    }
}
