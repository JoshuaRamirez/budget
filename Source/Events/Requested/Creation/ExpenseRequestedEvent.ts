import { Event } from "../../Core/Event";
import { Publisher } from "../../Core/Publisher";

export class ExpenseRequestedEvent extends Event {
  public CategoryId: any;
  public Description: string;
  public LedgerId: any;
  public PayeeId: any;
  public PlannedExpenseId: any;
  public TransactionId: any;
  public async Publish(): Promise<void> {
    await Publisher.Instance.Publish(this);
    return new Promise((resolve, reject) => resolve());
  }
}
