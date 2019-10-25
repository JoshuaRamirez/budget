import { ExpenseCreatedEvent } from "../../Events/ExpenseCreatedEvent";
import { ExpenseRequestedEvent } from "../../Events/ExpenseRequestedEvent";
import { ExpenseProjection } from "../../Projections/ExpenseProjection";
import { Handler } from "../Core/Handler";

export class CreateExpenseService extends Handler<ExpenseRequestedEvent> {
  public static Instance = new CreateExpenseService();
  private constructor() {
    super(ExpenseRequestedEvent);
  }
  public Handle(event: ExpenseRequestedEvent) {
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
    expenseCreatedEvent.PayeeId = expenseProjection.PayeeId;
    expenseCreatedEvent.PlannedExpenseId = expenseProjection.PlannedExpenseId;
    expenseCreatedEvent.LedgerId = expenseProjection.LedgerId;
    expenseCreatedEvent.Publish();
  }
}