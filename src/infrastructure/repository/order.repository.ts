import Order from "../../domain/entity/order"
import OrderItemModel from "../db/sequelize/model/order-item.model"
import OrderModel from "../db/sequelize/model/order.model"

class OrderRepository {
    async create(entity: Order): Promise<void> {
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
    }
}

export default OrderRepository