import { IEvent } from "./IEvent";

export class EventStore {
  public static Instance = new EventStore();
  private store = {};
  public Record<T extends IEvent>(event: T) {
    if (!this.store[event.EventName]) {
      this.store[event.EventName] = [];
    }
    this.store[event.EventName].push(event);
  }
}
