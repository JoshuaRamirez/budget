import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class ProposedTransactionCreatedEvent extends Event {
  public ProposedTransactionId: any;
  public Publish(): void {
    Publisher.Instance.Publish(this);
  }
}
