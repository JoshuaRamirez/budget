import { Id } from "./Id";
import { IEvent } from "./IEvent";

export abstract class Event implements IEvent {
  public EventId: any;
  public EventName: string;
  protected constructor(eventName: string) {
    this.EventId = Id.Generate();
    this.EventName = eventName;
  }
  public abstract Publish(): void;
}
