import { ExpenseCreatedEvent } from "../../Events/Created/ExpenseCreatedEvent";
import { ExpenseRequestedEvent } from "../../Events/Requested/Creation/ExpenseRequestedEvent";
import { ExpenseProjection } from "../../Projections/ExpenseProjection";
import { Receiver } from "../Core/Receiver";

export class CreateExpenseService extends Receiver<ExpenseRequestedEvent> {
  public static Instance = new CreateExpenseService();
  private constructor() {
    super(ExpenseRequestedEvent);
  }
  public async Receive(event: ExpenseRequestedEvent): Promise<void> {
    // Create ExpenseProjection
    const expenseProjection = new ExpenseProjection();
    expenseProjection.Description = event.Description;
    expenseProjection.LedgerId = event.LedgerId;
    expenseProjection.PayeeId = event.PayeeId;
    expenseProjection.TransactionId = event.TransactionId;
    expenseProjection.PlannedExpenseId = event.PlannedExpenseId;
    await expenseProjection.Project();
    // Publish ExpenseCreatedEvent
    const expenseCreatedEvent = new ExpenseCreatedEvent();
    expenseCreatedEvent.ExpenseId = expenseProjection.Id;
    await expenseCreatedEvent.Publish();
    return new Promise((resolve, reject) => resolve());
  }
}
