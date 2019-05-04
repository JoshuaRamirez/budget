import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class LedgerRequestedEvent extends Event {
  public Account: any;
  public Name: string;
  public Type: string;
  constructor() {
    super(LedgerRequestedEvent.name);
  }
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
