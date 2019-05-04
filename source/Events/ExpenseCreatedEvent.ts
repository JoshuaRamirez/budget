import { MainEvent } from "../Core/MainEvent";
import { Publisher } from "../Core/Publisher";

export class ExpenseCreatedEvent extends MainEvent<ExpenseCreatedEvent> {
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
