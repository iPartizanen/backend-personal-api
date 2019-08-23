// Instruments
import { Orders as OrdersModel } from '../models';
import { Products as ProductsModel } from '../models';
import { Customers as CustomersModel } from '../models';
import { ValidationError } from 'express-openapi-validate';

export class Orders {
    constructor(data) {
        this.models = {
            orders: new OrdersModel(data),
        };
    }

    async create() {
        const customersModel = new CustomersModel({ _id: this.models.orders.data.uid });
        await customersModel.getById(); // throw error if not found

        const productsModel = new ProductsModel({ _id: this.models.orders.data.pid });
        const product = await productsModel.getById();

        const itemsOrder = this.models.orders.data.count;
        const itemsAvailable = product.total;

        if (itemsAvailable < itemsOrder) {
            throw new ValidationError(`Attempt to order ${itemsOrder
            } items, but only ${itemsAvailable} available!`);
        }

        product.total -= itemsOrder;
        const newProductsModel = new ProductsModel({  hash: product.hash, payload: product });
        await newProductsModel.updateByHash();

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
