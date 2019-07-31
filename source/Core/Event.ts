import { Id } from "./Id";
import { User } from "./User";

export abstract class Event {
  public readonly Id: any = Id.Generate();
  public readonly UserId: any = User.Id;
  public readonly Name: string  = this.constructor.name;
  public abstract Publish(): void;
}
