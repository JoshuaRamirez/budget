import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class TransactionCreatedEvent extends Event {
  public TransactionId: any;
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
