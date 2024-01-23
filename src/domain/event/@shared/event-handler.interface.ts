import EventInterface from "./event.interface";

// T should implement an EventInterface and default value is a EventInterface
export default interface EventHandlerInterface<T extends EventInterface = EventInterface> {
    handle(event: T): void;
}