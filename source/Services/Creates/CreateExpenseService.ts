import { Handler } from "../../Core/Handler";
import { ExpenseCreatedEvent } from "../../Events/ExpenseCreatedEvent";
import { TransactionCreatedEvent } from "../../Events/TransactionCreatedEvent";
import { ExpenseProjection } from "../../Projections/ExpenseProjection";
import { TransactionProjection } from "../../Projections/TransactionProjection";
import { CreateExpenseSaga } from "../../Sagas/CreateExpenseSaga";

export class CreateExpenseService extends Handler<TransactionCreatedEvent> {
  public static Instance = new CreateExpenseService();
  private constructor() {
    super(TransactionCreatedEvent);
  }
  public Process(event: TransactionCreatedEvent) {
    // Quit if Saga doesn't exist on Event
    if (!event.SagaId) {
      return;
    }
    // Quit if Saga doesn't match this Service
    if (event.SagaName !== CreateExpenseSaga.name) {
      return;
    }
    // Create ExpenseProjection using Saga
    const saga = CreateExpenseSaga.Get(event.SagaId);
    const transactionProjection = TransactionProjection.Get(event.TransactionId);
    const expenseProjection = new ExpenseProjection();
    expenseProjection.Amount = saga.Amount;
    expenseProjection.Category = saga.Category;
    expenseProjection.Description = saga.Description;
    expenseProjection.LedgerId = transactionProjection.LedgerId; // TODO: Consider getting this from the saga
    expenseProjection.PayeeId = saga.PayeeId;
    expenseProjection.TransactionId = event.TransactionId;
    expenseProjection.PlannedExpenseId = saga.PlannedExpenseId;
    expenseProjection.Project();
    // Publish ExpenseCreatedEvent
    const expenseCreatedEvent = new ExpenseCreatedEvent();
    expenseCreatedEvent.ExpenseId = expenseProjection.Id;
    expenseCreatedEvent.Publish();
  }
}