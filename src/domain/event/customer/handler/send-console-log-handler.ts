import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendConsoleLogHandler implements EventHandlerInterface {
    handle(event: CustomerCreatedEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.Id}, ${event.eventData.Name} alterado para: ${event.eventData.Address}`)
    }
}