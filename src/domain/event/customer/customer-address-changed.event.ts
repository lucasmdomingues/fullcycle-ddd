import EventInterface from "../@shared/event.interface";

export default class CustomerAddressChangedEvent implements EventInterface {
    dateTimeOccurred: Date;
    eventData: any;

    constructor(data: any) {
        this.dateTimeOccurred = new Date()
        this.eventData = data
    }
}