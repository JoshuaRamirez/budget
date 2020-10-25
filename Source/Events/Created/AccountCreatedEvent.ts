import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

// TODO: Consider placing a constructor in events for required fields.
export class AccountCreatedEvent extends Event {
  public AccountId: any;
  public async Publish(): Promise<void> {
    await Publisher.Instance.Publish(this);
    return new Promise((resolve, reject) => resolve());
  }
}
