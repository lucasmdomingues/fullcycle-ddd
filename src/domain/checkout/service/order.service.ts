import { v4 as uuid } from "uuid";
import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";

class OrderService {
    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.Total, 0)
    }

    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if (items.length === 0) {
            throw new Error("order must have at least one item");
        }

        let order = new Order(uuid(), customer.Id, items)

        customer.addRewardPoints(order.Total / 2)

        return order
    }
}

export default OrderService;