class Product {
    private id: string
    private name: string
    private price: number

    constructor(id: string, name: string, price: number) {
        this.id = id
        this.name = name
        this.price = price
        this.validate();
    }

    get Name(): string {
        return this.name
    }

    get Price(): number {
        return this.price
    }

    validate(): void {
        if (this.id.length === 0) {
            throw new Error("product id cannot be empty");
        }
        if (this.name.length === 0) {
            throw new Error("product name cannot be empty");
        }
        if (this.price < 0) {
            throw new Error("product price cannot be empty");
        }
    }

    changeName(newName: string): void {
        this.name = newName
    }

    changePrice(newPrice: number) {
        this.price = newPrice
    }
}

export default Product;