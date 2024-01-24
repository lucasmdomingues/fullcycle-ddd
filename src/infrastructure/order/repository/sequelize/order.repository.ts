
import { Sequelize } from "sequelize-typescript"
import Order from "../../../../domain/checkout/entity/order"
import OrderItem from "../../../../domain/checkout/entity/order_item"
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order.repository.interface"
import OrderItemModel from "./order-item.model"
import OrderModel from "./order.model"

class OrderRepository implements OrderRepositoryInterface {
    private sequelize: Sequelize

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize
    }

    async create(entity: Order): Promise<void> {
        try {
            await OrderModel.create({
                id: entity.ID,
                customer_id: entity.CustomerID,
                total: entity.Total,
                items: entity.Items.map((item) => ({
                    id: item.ID,
                    product_id: item.ProductID,
                    name: item.Name,
                    price: item.Price,
                    quantity: item.Quantity,
                }))
            }, { include: [{ model: OrderItemModel }] })
        } catch (error) {
            throw new Error(`failed to create orders: ${error}`);
        }
    }

    async update(entity: Order): Promise<void> {
        const trx = await this.sequelize.transaction()

        try {
            entity.Items.forEach(async (item) => {
                await OrderItemModel.update({
                    product_id: item.ProductID,
                    name: item.Name,
                    price: item.Price,
                    quantity: item.Quantity,
                    trx: trx
                }, {
                    where: { id: item.ID, },
                })
            })

            await OrderModel.update({
                id: entity.ID,
                customer_id: entity.CustomerID,
                total: entity.Total,
            }, {
                where: { id: entity.ID },
                transaction: trx
            })

            await trx.commit()
        } catch (error) {
            await trx.rollback()
            throw new Error(`failed to update order: ${error}`);
        }
    }

    async find(id: string): Promise<Order> {
        const order = await OrderModel.findOne({
            where: { id },
            include: [{ model: OrderItemModel }],
        })

        return new Order(order.id, order.customer_id, order.items.map((item) => {
            return new OrderItem(
                item.id,
                item.product_id,
                item.name,
                item.price,
                item.price,
            )
        }))
    }

    async findAll(): Promise<Order[]> {
        const orders = await OrderModel.findAll({
            include: [{ model: OrderItemModel }]
        })

        return orders.map((order) => {
            return new Order(order.id, order.customer_id, order.items.map((item) => {
                return new OrderItem(
                    item.id,
                    item.product_id,
                    item.name,
                    item.price,
                    item.quantity,
                )
            }))
        })
    }
}

export default OrderRepository