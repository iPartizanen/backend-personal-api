// Instruments
import { orders } from '../odm';
import { NotFoundError } from '../helpers';

export class Orders {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const { hash } = await orders.create(this.data);

        return { hash };
    }

    _formatResult = (doc) => {
        return {
            customer: {
                name:   `${doc.uid.name.first} ${doc.uid.name.last}`,
                phones: doc.uid.phones,
            },
            product: doc.pid,
        };
    }

    async getAll() {
        const data = await orders
            .find({})
            .select('-__v -_id -count -comment -created -modified -hash')
            .populate('uid', '-__t -__v -_id -city -country -created -modified -hash -emails')
            .populate('pid', '-__v -_id -description -total -created -modified -hash')
            .lean();

        let result = [];
        data.forEach((doc) => {
            result.push(this._formatResult(doc));
        });

        return { data: result };
    }

    async getByHash() {
        const { hash } = this.data;

        let data = await orders
            .findOne({ hash })
            .select('-__v -_id -count -comment -created -modified -hash')
            .populate('uid', '-__t -__v -_id -city -country -created -modified -hash -emails')
            .populate('pid', '-__v -_id -description -total -created -modified -hash')
            .lean();

        if (!data) {
            throw new NotFoundError(`Can not find order with hash ${hash}`);
        }

        data = this._formatResult(data);

        return data;
    }

    async updateByHash() {
        const { hash, payload } = this.data;

        payload.modified = new Date();

        const data = await orders.findOneAndUpdate({ hash }, payload);

        if (!data) {
            throw new NotFoundError(`Can not find order with hash ${hash}`);
        }

        return this.getByHash();
    }

    async removeByHash() {
        const { hash } = this.data;

        const data = await orders.findOneAndDelete({ hash });

        if (!data) {
            throw new NotFoundError(`Can not find order with hash ${hash}`);
        }

        return data;
    }
}
