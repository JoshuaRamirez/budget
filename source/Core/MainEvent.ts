import { Id } from "./Id";
import { IEvent } from "./IEvent";
import { Publisher } from "./Publisher";

export abstract class MainEvent<TEvent extends MainEvent<TEvent>> implements IEvent {
  public EventId: any = Id.Generate();
  public EventName: string;
  constructor(eventName: string) {
    this.EventName = eventName;
  }
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
