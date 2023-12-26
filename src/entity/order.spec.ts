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
        }).toThrow("order items cannot be empty")
    });

    it("should calculate total", () => {
        const item1 = new OrderItem("1", "p1", "Item 1", 100, 2)
        const item2 = new OrderItem("2", "p2", "Item 2", 200, 2)

        const order1 = new Order("1", "123", [item1])
        expect(order1.Total).toBe(200)

        const order2 = new Order("2", "321", [item1, item2])
        expect(order2.Total).toBe(600)
    });

    it("should throw error if the item qty is less or equal zero", () => {
        expect(() => {
            const item1 = new OrderItem("1", "p1", "Item 1", 100, 0)
            const order1 = new Order("1", "123", [item1])
        }).toThrow("items quantity must be greater than zero")
    });
});