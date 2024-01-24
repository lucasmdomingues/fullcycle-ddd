class OrderItem {
    private id: string;
    private productID: string;
    private name: string;
    private price: number;
    private quantity: number;

    constructor(id: string, productID: string, name: string, price: number, quantity: number) {
        this.id = id;
        this.productID = productID;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    get ID(): string {
        return this.id
    }

    get Price(): number {
        return this.price
    }

    get Quantity(): number {
        return this.quantity
    }

    get Name(): string {
        return this.name
    }

    get ProductID(): string {
        return this.productID
    }

    calculateTotal(): number {
        return this.price * this.quantity
    }
}

export default OrderItem;