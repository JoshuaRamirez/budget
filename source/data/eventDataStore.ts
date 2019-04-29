import { IEvent } from "../Core/IEvent";

export class EventDataStore {
  public static Instance = new EventDataStore();
  private store = {};
  public Record<T extends IEvent>(event: T) {
    if (!this.store[event.EventName]) {
      this.store[event.EventName] = [];
    }
    this.store[event.EventName].push(event);
  }
}
