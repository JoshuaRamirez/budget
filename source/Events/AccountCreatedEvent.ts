import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class AccountCreatedEvent extends Event {
  public AccountId: any;
  public Publish(): void {
    Publisher.Instance.Publish(this);
  }
}
