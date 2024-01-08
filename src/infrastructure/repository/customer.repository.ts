import Address from "../../domain/entity/address"
import Customer from "../../domain/entity/customer"
import CustomerRepositoryInterface from "../../domain/repository/customer.repository.interface"
import CustomerModel from "../db/sequelize/model/customer.model"

// Um Repository por Aggregate
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
            throw new Error("customer not found");
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

    async findAll(): Promise<Customer[]> {
        const customers = await CustomerModel.findAll()

        return customers.map((c) => {
            let address = new Address(
                c.street,
                c.number,
                c.zipcode,
                c.city,
            )

            let customer = new Customer(c.id, c.name)
            customer.changeAddress(address)
            customer.addRewardPoints(c.rewardPoints)

            if (c.active) {
                customer.activate();
            }

            return customer
        })
    }
}

export default CustomerRepository