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
        const staffPerson = await staff
            .findOne({ emails: {$elemMatch: {email} } })
            .select('password hash role')
            .lean();

        if (staffPerson) {
            const { hash, password: userPassword, role } = staffPerson;
            const match = await bcrypt.compare(password, userPassword);
            if (match) {
                return { hash, role };
            }
        }
    }

    async create() {
        let password = this.data.password; // should be encrypted
        if (!password) {
            password = await bcrypt.hash('#Aa111111', 5);
        }

        const [ first, last ] =  this.data.name.split(' ');
        const newStaff = {
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
            role: this.data.role,
        };

        const { hash } = await staff.create(newStaff);

        return { hash };
    }

    async getAll() {
        const data = await staff
            .find({})
            .select('-__v -_id -__t -hash -created -modified -disabled')
            .lean();

        return { data };
    }
}
