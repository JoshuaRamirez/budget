import { Event } from "../../Events/Core/Event";
import { Publisher } from "../../Events/Core/Publisher";
import { IReceiver } from "./IReceiver";

export abstract class Receiver<TEvent extends Event> implements IReceiver<TEvent> {
  private readonly eventType: any;
  private handles = [];
  protected constructor(eventType: typeof Event) {
    this.eventType = eventType;
  }
  public abstract async Receive(event: TEvent): Promise<void>;
  public Subscribe() {
    const handle = Publisher.Instance.Subscribe(this.eventType, this);
    this.handles.push(handle);
  }
  public UnSubscribe() {
    this.handles.forEach(handle => {
      Publisher.Instance.UnSubscribe(this.eventType, handle);
    });
    this.handles = [];
  }
}
