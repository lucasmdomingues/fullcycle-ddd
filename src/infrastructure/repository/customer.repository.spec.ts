import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";

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

    it("should throw a not found", async () => {
        const customerRepository = new CustomerRepository()

        expect(async () => {
            let customerModel = await customerRepository.find("1234")
        }).rejects.toThrow("customer not found")
    })

    it("should find all customers", async () => {
        const c1 = new Customer("123", "Customer 1")
        const a1 = new Address("Street 1", 1, "123", "City 1")
        c1.changeAddress(a1)
        c1.addRewardPoints(10)

        const c2 = new Customer("456", "Customer 2")
        const a2 = new Address("Street 2", 2, "456", "City 2")
        c2.changeAddress(a2)
        c1.addRewardPoints(20)

        const customerRepository = new CustomerRepository()
        await customerRepository.create(c1)
        await customerRepository.create(c2)

        const customers = await customerRepository.findAll();

        expect(customers).toHaveLength(2)
        expect(customers).toContainEqual(c1)
        expect(customers).toContainEqual(c2)
    })
})