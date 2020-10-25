import { Event } from "./Event";

export class EventStore {
  public static Instance = new EventStore();
  private store = {};
  public async Record<TEvent extends Event>(event: TEvent): Promise<void> {
    if (!this.store[event.EventName]) {
      this.store[event.EventName] = [];
    }
    this.store[event.EventName].push(event);
    return new Promise((resolve, reject) => resolve());
  }
}
