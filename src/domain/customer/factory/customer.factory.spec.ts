import Address from "../value-object/address"
import CustomerFactory from "./customer.factory"

describe("Customer factory unit tests", () => {
    it("should create a customer", () => {
        const customer = CustomerFactory.create("Customer 1")
        expect(customer.Id).toBeDefined()
        expect(customer.Name).toBe("Customer 1")
        expect(customer.Address).toBeUndefined()
    })

    it("should create a customer with an address", () => {
        const address = new Address("Street", 1, "123", "City")
        const customer = CustomerFactory.createWithAddress("Customer 1", address)
        expect(customer.Id).toBeDefined()
        expect(customer.Name).toBe("Customer 1")
        expect(customer.Address).toBe(address)
    })
})