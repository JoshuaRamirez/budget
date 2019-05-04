import { ISubscriber } from "../Core/ISubscriber";
import { ProjectionStore } from "../Core/ProjectionStore";
import { Publisher } from "../Core/Publisher";
import { SagaStore } from "../Core/SagaStore";
import { TransactionCreatedEvent } from "../Events/TransactionCreatedEvent";
import { ExpenseProjection } from "../Projections/ExpenseProjection";
import { CreateExpenseSaga } from "../Sagas/CreateExpenseSaga";

export class CreateExpenseService implements ISubscriber<TransactionCreatedEvent> {
  public static Instance = new CreateExpenseService();
  public Process(event: TransactionCreatedEvent) {
    if (!event.SagaId) {
      return;
    }
    if (event.SagaName !== CreateExpenseSaga.name) {
      return;
    }
    const saga = SagaStore.Instance.GetSaga<CreateExpenseSaga>(event.SagaId);
    const expenseProjection = new ExpenseProjection();
    expenseProjection.Amount = saga.expenseRequestedEvent.Amount;
    expenseProjection.Category = saga.expenseRequestedEvent.Category;
    expenseProjection.Description = saga.expenseRequestedEvent.Description;
    expenseProjection.LedgerId = event.Transaction.LedgerId;
    expenseProjection.PayeeId = saga.expenseRequestedEvent.PayeeId;
    expenseProjection.TransactionId = event.Transaction.Id;
    ProjectionStore.Instance.Project(expenseProjection);
  }
  public Subscribe() {
    Publisher.Instance.Subscribe(TransactionCreatedEvent, this);
  }
}
