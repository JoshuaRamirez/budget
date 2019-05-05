import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { TransactionCreatedEvent } from "../Events/TransactionCreatedEvent";
import { ExpenseProjection } from "../Projections/ExpenseProjection";
import { CreateExpenseSaga } from "../Sagas/CreateExpenseSaga";

export class CreateExpenseService implements ISubscriber<TransactionCreatedEvent> {
  public static Instance = new CreateExpenseService();
  public Process(event: TransactionCreatedEvent) {
    // Quit if Saga doesn't exist on Event
    if (!event.SagaId) {
      return;
    }
    // Quit if Saga doesn't match this Service
    if (event.SagaName !== CreateExpenseSaga.name) {
      return;
    }
    // Create Expense Projection using Saga
    const saga = CreateExpenseSaga.Get(event.SagaId);
    const expenseProjection = new ExpenseProjection();
    expenseProjection.Amount = saga.Amount;
    expenseProjection.Category = saga.Category;
    expenseProjection.Description = saga.Description;
    expenseProjection.LedgerId = event.Transaction.LedgerId;
    expenseProjection.PayeeId = saga.PayeeId;
    expenseProjection.TransactionId = event.Transaction.Id;
    expenseProjection.PlannedExpenseId = saga.PlannedExpenseId;
    expenseProjection.Project();
  }
  public Subscribe() {
    Publisher.Instance.Subscribe(TransactionCreatedEvent, this);
  }
}
