import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class PayeeRequestedEvent extends Event {
  public Description: string;
  public Name: string;
  public Type: string;
  constructor() {
    super(PayeeRequestedEvent.name);
  }
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
