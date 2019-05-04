import { Id } from "./Id";
import { IEvent } from "./IEvent";

export abstract class Event<TEvent extends Event<TEvent>> implements IEvent {
  public EventId: any = Id.Generate();
  public EventName: string;
  protected constructor(eventName: string) {
    this.EventName = eventName;
  }
  public abstract Publish();
}
