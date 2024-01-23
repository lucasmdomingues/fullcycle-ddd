import Address from "../../entity/address"
import Customer from "../../entity/customer"
import EventDispatcher from "../@shared/event-dispatcher"
import CustomerAddressChangedEvent from "./customer-address-changed.event"
import CustomerCreatedEvent from "./customer-created.event"
import SendConsoleLogHandler from "./handler/send-console-log-handler"
import SendFirstConsoleLogHandler from "./handler/send-first-console-log-handler"
import SendSecondConsoleLogHandler from "./handler/send-second-console-log-handler"

describe("Customer created tests", () => {
    // register an event
    it("should register an event handler", () => {
        const dispatcher = new EventDispatcher()
        const handler = new SendConsoleLogHandler()

        dispatcher.register("CustomerCreatedEvent", handler)

        expect(dispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(1)
        expect(dispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined()
        expect(dispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(handler)
    })

    // unregister an event
    it("should unregister an event handler", () => {
        const dispatcher = new EventDispatcher()
        const handler = new SendConsoleLogHandler()

        dispatcher.register("CustomerCreatedEvent", handler)
        expect(dispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(handler)

        dispatcher.unregister("CustomerCreatedEvent", handler)
        expect(dispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined()
        expect(dispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(0)
    })

    // unregister all
    it("should unregister all event handlers", () => {
        const dispatcher = new EventDispatcher()
        const handler = new SendConsoleLogHandler()

        dispatcher.register("CustomerCreatedEvent", handler)
        expect(dispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(handler)

        dispatcher.unregisterAll()
        expect(dispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined()
    })

    // should notify all event
    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher()

        // Handlers
        const firstLog = new SendFirstConsoleLogHandler()
        const secondLog = new SendSecondConsoleLogHandler()
        const thirtyLog = new SendConsoleLogHandler()

        // Spy
        const spyFirstLog = jest.spyOn(firstLog, "handle")
        const spySecondLog = jest.spyOn(secondLog, "handle")
        const spyThirtyLog = jest.spyOn(thirtyLog, "handle")

        // Events
        const customer = new Customer("1", "Customer 1")
        const customerCreatedEvent = new CustomerCreatedEvent(customer)

        const address = new Address("Street 1", 1, "123", "City 1")
        customer.changeAddress(address)
        const customerAddressChangedEvent = new CustomerAddressChangedEvent(customer)

        // Register events
        eventDispatcher.register("CustomerCreatedEvent", firstLog)
        eventDispatcher.register("CustomerCreatedEvent", secondLog)
        eventDispatcher.register("CustomerAddressChangedEvent", thirtyLog)

        // Notify
        eventDispatcher.notify(customerCreatedEvent)
        eventDispatcher.notify(customerAddressChangedEvent)

        expect(spyFirstLog).toHaveBeenCalled()
        expect(spySecondLog).toHaveBeenCalled()
        expect(spyThirtyLog).toHaveBeenCalled()
    })
})