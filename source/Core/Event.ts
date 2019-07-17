import { Id } from "./Id";

export abstract class Event {
  public readonly Id: any = Id.Generate();
  public readonly Name: string  = this.constructor.name;
  public abstract Publish(): void;
}
