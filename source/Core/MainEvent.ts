import { IEvent } from "./IEvent";
import { Publisher } from "./Publisher";

export abstract class MainEvent<TEvent extends MainEvent<TEvent>> extends Publisher<TEvent> implements IEvent {
  public EventId: any = Date.now();
  public EventName: string;
  constructor(eventName: string) {
    super();
    this.EventName = eventName;
  }
}
