class Address {
    street: string;
    number: number;
    city: string;
    zipcode: string;

    constructor(street: string, number: number, zipcode: string, city: string,) {
        this.street = street
        this.number = number
        this.city = city
        this.zipcode = zipcode
    }

    get Street(): string {
        return this.street
    }
    get Number(): number {
        return this.number
    }
    get City(): string {
        return this.city
    }
    get Zipcode(): string {
        return this.zipcode
    }

    toString(): string {
        return `${this.Street}, ${this.Number}, ${this.city}, ${this.Zipcode}`
    }
}

export default Address