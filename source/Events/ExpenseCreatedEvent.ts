import { MainEvent } from "../Core/MainEvent";

export class ExpenseCreatedEvent extends MainEvent<ExpenseCreatedEvent> {
  public PayeeId: any;
  public PlannedExpenseId: any;
  public TransactionId: any;
  public Type: string;
  constructor() {
    super(ExpenseCreatedEvent.name);
  }
}
