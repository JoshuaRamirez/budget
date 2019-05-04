import { MainEvent } from "../Core/MainEvent";
import { Publisher } from "../Core/Publisher";

export class ExpenseRequestedEvent extends MainEvent<ExpenseRequestedEvent> {
  public Amount: number;
  public Description: string;
  public LedgerId: any;
  public PayeeId: any;
  public PlannedExpenseId: any;
  public Category: string;
  constructor() {
    super(ExpenseRequestedEvent.name);
  }
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
