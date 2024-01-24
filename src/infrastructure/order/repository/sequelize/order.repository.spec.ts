import { Sequelize } from "sequelize-typescript";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";
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

        const orderRepository = new OrderRepository(sequelize)
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

    it("should update a order", async () => {
        const customerRepository = new CustomerRepository()

        const address = new Address("Street1", 1, "123", "City 1")
        const customer = new Customer("123", "Customer 1")
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const productRepository = new ProductRepository()
        const product = new Product("123", "Product 1", 10)
        await productRepository.create(product)

        const oi1 = new OrderItem("1", product.ID, product.Name, product.Price, 2)
        const o1 = new Order("123", "123", [oi1])

        const orderRepository = new OrderRepository(sequelize)
        await orderRepository.create(o1)

        const oi2 = new OrderItem("1", product.ID, product.Name, product.Price, 4)
        const o2 = new Order("123", "123", [oi2])

        await orderRepository.update(o2)

        const orderModel = await OrderModel.findOne({
            where: { id: "123" },
            include: ["items"]
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: o2.ID,
            customer_id: o2.CustomerID,
            total: o2.Total,
            items: [
                {
                    id: oi2.ID,
                    product_id: oi2.ProductID,
                    name: oi2.Name,
                    price: oi2.Price,
                    quantity: oi2.Quantity,
                    order_id: o2.ID
                },
            ],
        })
    })

    it("should find a order", async () => {
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

        const orderRepository = new OrderRepository(sequelize)
        await orderRepository.create(order)

        const orderModel = await OrderModel.findOne({
            where: { id: order.ID },
            include: ["items"]
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.ID,
            customer_id: order.CustomerID,
            total: order.Total,
            items: [
                {
                    id: orderItem.ID,
                    product_id: orderItem.ProductID,
                    name: orderItem.Name,
                    price: orderItem.Price,
                    quantity: orderItem.Quantity,
                    order_id: order.ID
                },
            ],
        })
    })

    it("should find some orders", async () => {
        const customerRepository = new CustomerRepository()

        const address = new Address("Street1", 1, "123", "City 1")
        const customer = new Customer("123", "Customer 1")
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const productRepository = new ProductRepository()
        const orderRepository = new OrderRepository(sequelize)

        const product = new Product("123", "Product", 10)
        await productRepository.create(product)

        // #1
        const oi1 = new OrderItem("1", product.ID, product.Name, product.Price, 2)
        const o1 = new Order("123", "123", [oi1])
        await orderRepository.create(o1)

        // #2
        const oi2 = new OrderItem("2", product.ID, product.Name, product.Price, 4)
        const o2 = new Order("456", "123", [oi2])
        await orderRepository.create(o2)

        const orders = [o1, o2]
        const foundedOrders = await orderRepository.findAll()

        expect(orders).toEqual(foundedOrders)
        expect(foundedOrders).toHaveLength(2)
    })
})