import { Id } from "./Id";

export abstract class Event {
  public readonly Id: any;
  public readonly EventName: string;
  protected constructor(eventName: string) {
    this.Id = Id.Generate();
    this.EventName = eventName;
  }
  public abstract Publish(): void;
}
