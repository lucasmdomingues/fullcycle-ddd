import productFactory from "./product.factory"

describe("Product factory unit tests", () => {
    it("should create a product type a", () => {
        const product = productFactory.create("a", "Product A", 1)
        expect(product.ID).toBeDefined();
        expect(product.Name).toBe("Product A")
        expect(product.Price).toBe(1)
        expect(product.constructor.name).toBe("Product")
    })

    it("should create a product type b", () => {
        const product = productFactory.create("b", "Product B", 1)
        expect(product.ID).toBeDefined();
        expect(product.Name).toBe("Product B")
        expect(product.Price).toBe(2)
        expect(product.constructor.name).toBe("ProductB")
    })

    it("should throw an error when product type is not supported", () => {
        expect(() => {
            const product = productFactory.create("c", "Product C", 1)
        }).toThrow("Product type not supported")
    })
})