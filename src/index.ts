import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

const address = new Address("Teste", "Osasco", "SP", "06213-100");

const customer = new Customer("1", "Lucas");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "p1", "Item 1", 10, 1);
const item2 = new OrderItem("2", "p2", "Item 2", 15, 2);

const order = new Order("1", "123", [item1, item2]);