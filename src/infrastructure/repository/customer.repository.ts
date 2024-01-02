import Customer from "../../domain/entity/customer"
import CustomerRepositoryInterface from "../../domain/repository/customer.repository.interface"

class CustomerRepository implements CustomerRepositoryInterface {
    create(entity: Customer): Promise<void> {
        throw new Error("Method not implemented.")
    }
    update(entity: Customer): Promise<void> {
        throw new Error("Method not implemented.")
    }
    find(id: string): Promise<Customer> {
        throw new Error("Method not implemented.")
    }
    findAll(): Promise<Customer[]> {
        throw new Error("Method not implemented.")
    }

}

export default CustomerRepository