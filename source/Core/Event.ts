import { Id } from "./Id";

export abstract class Event {
  public readonly Id: any;
  public readonly Name: string;
  protected constructor(name: string) {
    this.Id = Id.Generate();
    this.Name = name;
  }
  public abstract Publish(): void;
}
