import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { SagaStore } from "../Core/SagaStore";
import { ExpenseRequestedEvent } from "../Events/ExpenseRequestedEvent";
import { TransactionRequestedEvent } from "../Events/TransactionRequestedEvent";
import { CreateExpenseSaga } from "../Sagas/CreateExpenseSaga";

export class CreateExpenseTransactionService implements ISubscriber<ExpenseRequestedEvent> {
  public static Instance = new CreateExpenseTransactionService();
  public Process(event: ExpenseRequestedEvent): void {
    // Start New Saga
    const saga = new CreateExpenseSaga();
    saga.expenseRequestedEvent = event;
    SagaStore.Instance.SaveSaga(saga);
    // Submit New Transaction
    const transactionRequestedEvent = new TransactionRequestedEvent(saga.Name, saga.Id);
    transactionRequestedEvent.Amount = event.Amount;
    transactionRequestedEvent.Destination = undefined;
    transactionRequestedEvent.LedgerId = event.LedgerId;
    transactionRequestedEvent.Source = event.LedgerId;
    transactionRequestedEvent.Type = "Expense";
    transactionRequestedEvent.SagaId = saga.Id;
    transactionRequestedEvent.SagaName = saga.Name;
    transactionRequestedEvent.Publish();
  }
  public Subscribe() {
    Publisher.Instance.Subscribe(ExpenseRequestedEvent, this);
  }
}
