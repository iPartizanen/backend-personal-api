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
            .select('-__v -_id -__t -city -country -hash -created -modified')
            .lean();

        if (!data) {
            throw new NotFoundError(`Can not find customer with hash ${hash}`);
        }

        return data;
    }

    async updateByHash() {
        const { hash, payload } = this.data;

        const oldCustomer = await customers
            .findOne({ hash })
            .select('phones emails')
            .lean();

        if (!oldCustomer) {
            throw new NotFoundError(`Can not find customer with hash ${hash}`);
        }

        let { emails, phones } = oldCustomer;

        payload.emails.forEach((modifier) => {
            if (modifier.action === 'add'
                && emails.every((elem) => elem.email !== modifier.email)) {
                emails.push({ email: modifier.email });  // add non-primary
            } else if (modifier.action === 'remove') {
                emails = emails.filter((elem) => elem.email !== modifier.email
                    || elem.primary);  // remove except primary
            }
        });
        payload.phones.forEach((modifier) => {
            if (modifier.action === 'add'
                && phones.every((elem) => elem.phone !== modifier.phone)) {
                phones.push({ phone: modifier.phone });  // add non-primary
            } else if (modifier.action === 'remove') {
                phones = phones.filter((elem) => elem.phone !== modifier.phone);
            }
        });
        if (phones.every((elem) => !elem.primary) && phones.length > 0) {
            phones[ 0 ].primary = true;
        }
        payload.emails = emails;
        payload.phones = phones;
        payload.modified = new Date();

        const data = await customers.findOneAndUpdate({ hash }, payload);

        if (!data) {
            throw new NotFoundError(`Can not find customer with hash ${hash}`);
        }

        return this.getByHash();
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
            .select('-__v')
            .lean();

        if (!data) {
            throw new NotFoundError(`Can not find customer with ID=${_id}`);
        }

        return data;
    }
}
