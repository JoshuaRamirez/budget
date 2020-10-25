import { Event } from "../../Core/Event";
import { Publisher } from "../../Core/Publisher";

export class UserRequestedEvent extends Event {
  public UserName: string;
  public Type: string;
  public async Publish(): Promise<void> {
    await Publisher.Instance.Publish(this);
    return new Promise((resolve, reject) => resolve());
  }
}
