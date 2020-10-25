import { Event } from "../../Core/Event";
import { Publisher } from "../../Core/Publisher";

export class AccountRequestedEvent extends Event {
  public AccountName: string;
  public Type: string;
  public UserId: any;
  public async Publish(): Promise<void> {
    await Publisher.Instance.Publish(this);
    return new Promise((resolve, reject) => resolve());
  }
}
