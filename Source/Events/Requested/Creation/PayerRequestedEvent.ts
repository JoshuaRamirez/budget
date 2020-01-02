import { Event } from "../../Core/Event";
import { Publisher } from "../../Core/Publisher";

export class PayerRequestedEvent extends Event {
  public Description: string;
  public PayerName: string;
  public Type: string;
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
