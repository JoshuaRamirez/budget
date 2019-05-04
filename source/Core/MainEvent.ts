import { Id } from "./Id";
import { IEvent } from "./IEvent";

export abstract class MainEvent<TEvent extends MainEvent<TEvent>> implements IEvent {
  public EventId: any = Id.Generate();
  public EventName: string;
  constructor(eventName: string) {
    this.EventName = eventName;
  }
  public abstract Publish();
}
