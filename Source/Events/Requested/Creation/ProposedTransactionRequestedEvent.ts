import { Event } from "../../Core/Event";
import { Publisher } from "../../Core/Publisher";

export class ProposedTransactionRequestedEvent extends Event {
  public Amount: number;
  public Date: Date;
  public Description: string;
  public PlannedTransactionId: any;
  public TransactionType: string;
  public async Publish(): Promise<void> {
    await Publisher.Instance.Publish(this);
    return new Promise((resolve, reject) => resolve());
  }
}
