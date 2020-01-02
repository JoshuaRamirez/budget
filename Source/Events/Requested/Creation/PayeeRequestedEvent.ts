import { Event } from "../../Core/Event";
import { Publisher } from "../../Core/Publisher";

export class PayeeRequestedEvent extends Event {
  public Description: string;
  public PayeeName: string;
  public Type: string;
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
