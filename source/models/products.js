// Instruments
import { products } from '../odm';
import { NotFoundError } from '../helpers';

export class Products {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const data = await products.create(this.data);

        return data;
    }

    async getAll() {
        const data = await products
            .find({})
            .select('-__v -id')
            .lean();

        return { data };
    }

    async getByHash() {
        const { hash } = this.data;

        const data = await products
            .findOne({ hash })
            .select('-__v -id')
            .lean();

        if (!data) {
            throw new NotFoundError(`Can not find product with hash ${hash}`);
        }

        return data;
    }

    async updateByHash() {
        const { hash, payload } = this.data;

        const data = await products.findOneAndUpdate({ hash }, payload);

        if (!data) {
            throw new NotFoundError(`Can not find product with hash ${hash}`);
        }

        return data;
    }

    async removeByHash() {
        const { hash } = this.data;

        const data = await products.findOneAndDelete({ hash });

        if (!data) {
            throw new NotFoundError(`Can not find product with hash ${hash}`);
        }

        return data;
    }

    async getById() {
        const { _id } = this.data;

        const data = await products
            .findOne({ _id })
            .select('-__v -id')
            .lean();

        if (!data) {
            throw new NotFoundError(`Can not find product with ID=${_id}`);
        }

        return data;
    }
}
