import Address from "../../domain/entity/address"
import Customer from "../../domain/entity/customer"
import CustomerRepositoryInterface from "../../domain/repository/customer.repository.interface"
import CustomerModel from "../db/sequelize/model/customer.model"

class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.Id,
            name: entity.Name,
            street: entity.Address.Street,
            number: entity.Address.Number,
            zipcode: entity.Address.Zipcode,
            city: entity.Address.City,
            active: entity.isActive(),
            rewardPoints: entity.RewardPoints
        })
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                name: entity.Name,
                street: entity.Address.Street,
                number: entity.Address.Number,
                zipcode: entity.Address.Zipcode,
                city: entity.Address.City,
                active: entity.isActive(),
                rewardPoints: entity.RewardPoints
            },
            {
                where: {
                    id: entity.Id
                }
            }
        )
    }

    async find(id: string): Promise<Customer> {
        let customerModel: CustomerModel

        try {
            customerModel = await CustomerModel.findOne({
                where: { id },
                rejectOnEmpty: true,
            })
        } catch (error) {
            throw new Error("Customer not found");
        }


        const customer = new Customer(customerModel.id, customerModel.name)
        const address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.zipcode,
            customerModel.city,
        )

        customer.changeAddress(address)
        return customer
    }

    findAll(): Promise<Customer[]> {
        throw new Error("Method not implemented.")
    }

}

export default CustomerRepository