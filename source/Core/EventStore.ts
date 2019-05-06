import { Event } from "./Event";

export class EventStore {
  public static Instance = new EventStore();
  private store = {};
  public Record<TEvent extends Event>(event: TEvent) {
    if (!this.store[event.Name]) {
      this.store[event.Name] = [];
    }
    this.store[event.Name].push(event);
  }
}
