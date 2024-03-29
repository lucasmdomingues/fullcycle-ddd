import SendmailWhenProductIsCreateHandler from "../../product/event/handler/send-email-when-product-is-created-handler"
import ProductCreatedEvent from "../../product/event/product-created.event"
import EventDispatcher from "./event-dispatcher"

describe("Domain events tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendmailWhenProductIsCreateHandler()

        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toHaveLength(1)
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)
    })

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendmailWhenProductIsCreateHandler()

        eventDispatcher.register("ProductCreatedEvent", eventHandler)
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler)
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toHaveLength(0)
    })

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendmailWhenProductIsCreateHandler()

        eventDispatcher.register("ProductCreatedEvent", eventHandler)
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)

        eventDispatcher.unregisterAll()
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined()
    })

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendmailWhenProductIsCreateHandler()
        const spyEventHandler = jest.spyOn(eventHandler, "handle")

        eventDispatcher.register("ProductCreatedEvent", eventHandler)
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            desc: "Product 1 Description",
            price: 10.0
        })

        eventDispatcher.notify(productCreatedEvent)
        expect(spyEventHandler).toHaveBeenCalled()
    })
})