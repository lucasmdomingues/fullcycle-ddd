import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import ProductCreatedEvent from "../product-created.event";

export interface EmailService {
    send(templateName: string, data: any): Promise<void>
}

export default class SendmailWhenProductIsCreateHandler implements EventHandlerInterface<ProductCreatedEvent> {
    constructor(private emailService?: EmailService) { }

    handle(event: ProductCreatedEvent): void {
        this.emailService.send("productCreated", event.eventData)
        console.log(`product created event has been called`);
    }
}