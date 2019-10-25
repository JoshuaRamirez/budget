import { User } from "../../Core/User";
import { Id } from "../../Projections/Core/Id";

export abstract class Event {
  public readonly Id: any = Id.Generate();
  public readonly PublishingUserId: any = User.Id;
  // TODO: Rename below to EventName
  public readonly EventName: string  = this.constructor.name;
  public abstract Publish(): void;
}
