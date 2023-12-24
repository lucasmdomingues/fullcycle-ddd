import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "", []);
        }).toThrow("order id cannot be empty")
    });

    it("should throw error when customer id is empty", () => {
        expect(() => {
            let order = new Order("1", "", []);
        }).toThrow("customer id cannot be empty")
    });

    it("should throw error when items qtd is zero", () => {
        expect(() => {
            let order = new Order("1", "123", []);
        }).toThrow("items qtd must be greater than zero")
    });

    it("should calculate total", () => {
        const item1 = new OrderItem("1", "Item 1", 100)
        const item2 = new OrderItem("2", "Item 2", 200)

        const order1 = new Order("1", "123", [item1])
        expect(order1.Total).toBe(100)

        const order2 = new Order("2", "321", [item1, item2])
        expect(order2.Total).toBe(300)
    });
});