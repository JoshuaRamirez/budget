import { Event } from "../../Core/Event";
import { Publisher } from "../../Core/Publisher";

export class ProposedTransactionCreationRequestedEvent extends Event {

  public Amount: number;
  public Date: Date;
  public Description: string;
  public PlannedTransactionId: any;
  public TransactionType: string;
  public Publish(): void {
    Publisher.Instance.Publish(this);
  }
}
