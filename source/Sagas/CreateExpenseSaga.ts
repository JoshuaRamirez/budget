import { Saga } from "../Core/Saga";
import { ExpenseRequestedEvent } from "../Events/ExpenseRequestedEvent";

export class CreateExpenseSaga extends Saga {
  public Amount: number;
  public Category: string;
  public Description: string;
  public PayeeId: any;
  constructor(expenseRequestedEvent: ExpenseRequestedEvent) {
    super(CreateExpenseSaga.name);
    this.Amount = expenseRequestedEvent.Amount;
    this.Category = expenseRequestedEvent.Category;
    this.Description = expenseRequestedEvent.Description;
    this.PayeeId = expenseRequestedEvent.PayeeId;
  }
}
