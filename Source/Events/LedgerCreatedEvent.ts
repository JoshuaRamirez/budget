import { Event } from "./Core/Event";
import { Publisher } from "./Core/Publisher";

export class LedgerCreatedEvent extends Event {
  public LedgerId: any;
  public AccountId: any;
  public Publish(): void {
    Publisher.Instance.Publish(this);
  }
}
