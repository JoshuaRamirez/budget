import { Id } from "./Id";
import { IEvent } from "./IEvent";

// TODO: Rename File
export abstract class MainEvent<TEvent extends MainEvent<TEvent>> implements IEvent {
  public EventId: any = Id.Generate();
  public EventName: string;
  protected constructor(eventName: string) {
    this.EventName = eventName;
  }
  public abstract Publish();
}
