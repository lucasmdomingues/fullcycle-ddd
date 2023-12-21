import Address from "./address";

class Customer {
    id: string;
    name: string;
    address!: Address;
    active: boolean = false;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    set Address(address: Address) {
        this.address = address;
    }

    activate(){
        if (this.address == undefined) {
            throw new Error("address cannot be empty");
        }
        this.active = true;
    }
}

export default Customer