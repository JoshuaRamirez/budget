import { Event } from "../../Core/Event";
import { Publisher } from "../../Core/Publisher";

export class DepositRequestedEvent extends Event {
  public CategoryId: any;
  public Description: string;
  public LedgerId: any;
  public PayerId: any;
  public PlannedDepositId: any;
  public TransactionId: any;
  public async Publish(): Promise<void> {
    await Publisher.Instance.Publish(this);
    return new Promise((resolve, reject) => resolve());
  }
}
