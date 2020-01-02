import { Event } from "../../Core/Event";
import { Publisher } from "../../Core/Publisher";

export class TransactionRequestedEvent extends Event {
  public Amount: number;
  public Destination: any; // TODO: What's this?
  public LedgerId: any;
  public Source: any;
  public Type: string;
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
