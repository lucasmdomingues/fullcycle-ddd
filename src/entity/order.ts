/* 
Caso o objeto esteja dentro do mesmo agregado, a relação é por objeto.
caso não a relação é feito por ID.
*/

import OrderItem from "./order_item";

class Order {
    id: string;
    customerID: string;
    items: OrderItem[];

    constructor(id: string, customerID: string, items: OrderItem[]) {
        this.id = id;
        this.customerID = customerID;
        this.items = items;
    }
}

export default Order;