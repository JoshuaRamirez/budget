import { IEvent } from "./IEvent";
import { Publisher } from "./Publisher";

export abstract class MainEvent<TEvent extends MainEvent<TEvent>> implements IEvent {
  public EventId: any = Date.now();
  public EventName: string;
  constructor(eventName: string) {
    this.EventName = eventName;
  }
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
