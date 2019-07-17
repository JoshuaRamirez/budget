import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class LedgerRequestedEvent extends Event {
  public Account: any;
  public Type: string;
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
