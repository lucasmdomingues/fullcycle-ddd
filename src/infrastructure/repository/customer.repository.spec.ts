import { Sequelize } from "sequelize-typescript"
import ProductModel from "../db/sequelize/model/product.model";
import Product from "../../domain/entity/product";
import ProductRepository from "./product.repository";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";

describe("Customer repository test", () => {
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

        sequelize.addModels([CustomerModel])
        await sequelize.sync()
    })


    afterEach(async () => {
        await sequelize.close()
    })

    it('should create a customer', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("123", "Customer 1")
        const address = new Address("Street 1", 1, "123", "City 1")
        customer.changeAddress(address)

        await customerRepository.create(customer)

        const customerModel = await CustomerModel.findOne({ where: { id: "123" } })

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.Id,
            name: customer.Name,
            active: customer.isActive(),
            rewardPoints: customer.RewardPoints,
            street: address.Street,
            number: address.Number,
            zipcode: address.Zipcode,
            city: address.City
        })
    })

    it('should update a customer', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("123", "Customer 1")
        const address = new Address("Street 1", 1, "123", "City 1")
        customer.changeAddress(address)

        await customerRepository.create(customer)
        customer.changeName("Customer 2")
        await customerRepository.update(customer)

        const customerModel = await CustomerModel.findOne({ where: { id: "123" } })

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.Id,
            name: customer.Name,
            active: customer.isActive(),
            rewardPoints: customer.RewardPoints,
            street: address.Street,
            number: address.Number,
            zipcode: address.Zipcode,
            city: address.City
        })
    })

    it("should find a product", async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("123", "Customer 1")
        const address = new Address("Street 1", 1, "123", "City 1")
        customer.changeAddress(address)

        await customerRepository.create(customer)

        const customerModel = await customerRepository.find(customer.Id)

        expect(customer).toStrictEqual(customerModel)
    })

    // TODO: Add test to customer not found

    // it("should find all products", async () => {
    //     const productRepository = new ProductRepository()

    //     const p1 = new Product("1", "Product 1", 100)
    //     await productRepository.create(p1)

    //     const p2 = new Product("2", "Product 2", 200)
    //     await productRepository.create(p2)

    //     const products = [p1, p2]
    //     const foundedProducts = await productRepository.findAll();

    //     expect(products).toEqual(foundedProducts)
    // })
})