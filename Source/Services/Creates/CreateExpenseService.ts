import { ExpenseCreatedEvent } from "../../Events/Created/ExpenseCreatedEvent";
import { ExpenseRequestedEvent } from "../../Events/Requested/Creation/ExpenseRequestedEvent";
import { ExpenseProjection } from "../../Projections/ExpenseProjection";
import { Receiver } from "../Core/Receiver";

export class CreateExpenseService extends Receiver<ExpenseRequestedEvent> {
  public static Instance = new CreateExpenseService();
  private constructor() {
    super(ExpenseRequestedEvent);
  }
  public Receive(event: ExpenseRequestedEvent) {
    // Create ExpenseProjection
    const expenseProjection = new ExpenseProjection();
    expenseProjection.Description = event.Description;
    expenseProjection.LedgerId = event.LedgerId;
    expenseProjection.PayeeId = event.PayeeId;
    expenseProjection.TransactionId = event.TransactionId;
    expenseProjection.PlannedExpenseId = event.PlannedExpenseId;
    expenseProjection.Project();
    // Publish ExpenseCreatedEvent
    const expenseCreatedEvent = new ExpenseCreatedEvent();
    expenseCreatedEvent.ExpenseId = expenseProjection.Id;
    expenseCreatedEvent.Publish();
  }
}
