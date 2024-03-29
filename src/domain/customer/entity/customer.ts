import Address from "../value-object/address";

class Customer {
    private id: string;
    private name: string;
    private address!: Address;
    private active: boolean = false;
    private rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.validate();
    }

    get Name(): string {
        return this.name
    }

    get RewardPoints(): number {
        return this.rewardPoints
    }

    get Id(): string {
        return this.id
    }

    get Address(): Address {
        return this.address
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

    addRewardPoints(points: number) {
        this.rewardPoints += points
    }

    changeAddress(address: Address) {
        this.address = address
    }
}

export default Customer