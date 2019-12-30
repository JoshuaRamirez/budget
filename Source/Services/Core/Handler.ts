import { Event } from "../../Events/Core/Event";
import { Publisher } from "../../Events/Core/Publisher";
import { ISubscriber } from "./ISubscriber";

export abstract class Handler<TEvent extends Event> implements ISubscriber<TEvent> {
  private readonly eventType: any;
  private handles = [];
  protected constructor(eventType: typeof Event) {
    this.eventType = eventType;
  }
  public abstract Handle(event: TEvent): void;
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
