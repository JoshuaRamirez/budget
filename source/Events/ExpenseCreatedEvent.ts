import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class ExpenseCreatedEvent extends Event {
  public Description: string;
  public LedgerId: any;
  public PayeeId: any;
  public PlannedExpenseId: any;
  public TransactionId: any;
  public Type: string;
  constructor() {
    super(ExpenseCreatedEvent.name);
  }
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
