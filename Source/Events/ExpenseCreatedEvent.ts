import { Event } from "./Core/Event";
import { Publisher } from "./Core/Publisher";

export class ExpenseCreatedEvent extends Event {
  public ExpenseId: any;
  public PlannedExpenseId: any;
  public LedgerId: any;
  public PayeeId: any;
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
