import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class LedgerRequestedEvent extends Event {
  public AccountId: any;
  public Type: string;
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
