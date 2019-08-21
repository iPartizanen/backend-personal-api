// Instruments
import { Orders as OrdersModel } from '../models';

export class Orders {
    constructor(data) {
        this.models = {
            orders: new OrdersModel(data),
        };
    }

    async create() {
        const data = await this.models.orders.create();

        return data;
    }

    async getAll() {
        const data = await this.models.orders.getAll();

        return data;
    }

    async getByHash() {
        const data = await this.models.orders.getByHash();

        return data;
    }

    async updateByHash() {
        const data = await this.models.orders.updateByHash();

        return data;
    }

    async removeByHash() {
        const data = await this.models.orders.removeByHash();

        return data;
    }
}
