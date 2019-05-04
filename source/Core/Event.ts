import { Id } from "./Id";

export abstract class Event {
  public EventId: any;
  public EventName: string;
  protected constructor(eventName: string) {
    this.EventId = Id.Generate();
    this.EventName = eventName;
  }
  public abstract Publish(): void;
}
