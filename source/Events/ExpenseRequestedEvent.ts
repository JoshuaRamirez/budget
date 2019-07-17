import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class ExpenseRequestedEvent extends Event {
  public Amount: number;
  public Description: string;
  public LedgerId: any;
  public PayeeId: any;
  public PlannedExpenseId: any;
  public Category: string;
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
