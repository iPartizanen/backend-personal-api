// Instruments
import { orders } from '../odm';
import { NotFoundError } from '../helpers';

export class Orders {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const data = await orders.create(this.data);

        return data;
    }

    async getAll() {
        const data = await orders
            .find({})
            .select('-__v -id')
            .lean();

        return { data };
    }

    async getByHash() {
        const { hash } = this.data;

        const data = await orders
            .findOne({ hash })
            .select('-__v -id')
            .lean();

        if (!data) {
            throw new NotFoundError(`Can not find order with hash ${hash}`);
        }

        return data;
    }

    async updateByHash() {
        const { hash, payload } = this.data;

        const data = await orders.findOneAndUpdate({ hash }, payload);

        if (!data) {
            throw new NotFoundError(`Can not find order with hash ${hash}`);
        }

        return data;
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
