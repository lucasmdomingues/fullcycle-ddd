import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class SendConsoleLogHandler implements EventHandlerInterface {
    handle(event: CustomerAddressChangedEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.Id}, ${event.eventData.Name} alterado para: ${event.eventData.Address}`)
    }
}