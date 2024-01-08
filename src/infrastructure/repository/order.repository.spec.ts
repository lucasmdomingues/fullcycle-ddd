import { Sequelize } from "sequelize-typescript";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {
                force: true,
            }
        })

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
        await sequelize.sync()
    })


    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository()
        const address = new Address("Street1", 1, "123", "City 1")
        const customer = new Customer("123", "Customer 1")
        customer.changeAddress(address)

        await customerRepository.create(customer)

        const productRepository = new ProductRepository()
        const product = new Product("123", "Product 1", 10)

        await productRepository.create(product)

        const orderItem = new OrderItem("1", product.ID, product.Name, product.Price, 2)
        const order = new Order("123", "123", [orderItem])

        const orderRepository = new OrderRepository()
        await orderRepository.create(order)

        const orderModel = await OrderModel.findOne({
            where: { id: order.ID },
            include: ["items"]
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.Total,
            items: [
                {
                    id: orderItem.ID,
                    product_id: orderItem.ProductID,
                    name: orderItem.Name,
                    price: orderItem.Price,
                    quantity: orderItem.Quantity,
                    order_id: "123"
                },
            ],
        })
    })
})