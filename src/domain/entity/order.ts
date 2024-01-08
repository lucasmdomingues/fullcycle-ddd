/* 
Caso o objeto esteja dentro do mesmo agregado, a relação é por objeto.
caso não a relação é feito por ID.
*/

import OrderItem from "./order_item";

class Order {
    private id: string;
    private customerID: string;
    private items: OrderItem[];
    private total: number;

    constructor(id: string, customerID: string, items: OrderItem[]) {
        this.id = id;
        this.customerID = customerID;
        this.items = items;
        this.total = this.calculateTotal();
        this.validate();
    }

    get ID(): string {
        return this.id
    }

    get Total(): number {
        return this.total
    }

    get CustomerID(): string {
        return this.customerID
    }

    get Items(): OrderItem[] {
        return this.items
    }

    calculateTotal(): number {
        return this.items.reduce((acc, item) => acc + item.calculateTotal(), 0);
    }

    validate() {
        if (this.id.length === 0) {
            throw new Error("order id cannot be empty");
        }
        if (this.customerID.length === 0) {
            throw new Error("customer id cannot be empty");
        }
        if (this.items.length === 0) {
            throw new Error("order items cannot be empty");
        }
        if (this.items.some(item => item.Quantity <= 0)) {
            throw new Error("items quantity must be greater than zero");
        }
    }
}

export default Order;