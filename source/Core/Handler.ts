import { Event } from "./Event";
import { ISubscriber } from "./ISubscriber";
import { Publisher } from "./Publisher";

export abstract class Handler<TEvent extends Event> implements ISubscriber<TEvent> {
  private readonly eventType: any;
  private handles = [];
  protected constructor(eventType: any) {
    this.eventType = eventType;
  }
  public abstract Process(event: TEvent): void;
  public Subscribe() {
    const handle = Publisher.Instance.Subscribe(this.eventType, this);
    this.handles.push(handle);
  }
  public UnSubscribe() {
    this.handles.forEach((handle) => {
      Publisher.Instance.UnSubscribe(this.eventType, handle);
    });
    this.handles = [];
  }
}
