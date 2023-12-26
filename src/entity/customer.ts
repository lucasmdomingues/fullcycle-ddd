import Address from "./address";

class Customer {
    private id: string;
    private name: string;
    private address!: Address;
    private active: boolean = false;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.validate();
    }

    set Address(address: Address) {
        this.address = address;
    }

    get Name(): string {
        return this.name
    }

    validate() {
        if (this.id.length == 0) {
            throw new Error("customer id cannot be empty");
        }
        if (this.name.length == 0) {
            throw new Error("customer name cannot be empty");
        }
    }

    activate() {
        if (this.address == undefined) {
            throw new Error("address cannot be empty");
        }
        this.active = true;
    }
    
    deactivate() {
        this.active = false;
    }

    changeName(name: string): void {
        this.name = name;
    }

    isActive(): boolean {
        return this.active
    }
}

export default Customer