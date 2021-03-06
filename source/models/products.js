// Instruments
import { products } from '../odm';
import { NotFoundError } from '../helpers';

export class Products {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const { hash } = await products.create(this.data);

        return { hash };
    }

    async getAll() {
        const data = await products
            .find({})
            .select('-__v -id -hash -total -created -modified')
            .lean();

        return { data };
    }

    async getByHash() {
        const { hash } = this.data;

        const data = await products
            .findOne({ hash })
            .select('-__v -_id -hash -total -created -modified')
            .lean();

        if (!data) {
            throw new NotFoundError(`Can not find product with hash ${hash}`);
        }

        return data;
    }

    async updateByHash() {
        const { hash, payload } = this.data;

        payload.modified = new Date();

        const data = await products.findOneAndUpdate({ hash }, payload);

        if (!data) {
            throw new NotFoundError(`Can not find product with hash ${hash}`);
        }

        return this.getByHash();
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
