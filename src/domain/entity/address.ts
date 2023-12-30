class Address {
    street: string;
    city: string;
    state: string;
    zipcode: string;

    constructor(street: string, city: string, state: string, zipcode: string) {
        this.street = street
        this.city = city
        this.state = state
        this.zipcode = zipcode
    }
}

export default Address