import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { SagaStore } from "../Core/SagaStore";
import { ExpenseRequestedEvent } from "../Events/ExpenseRequestedEvent";
import { TransactionSubmittedEvent } from "../Events/TransactionSubmittedEvent";
import { CreateExpenseSaga } from "../Sagas/CreateExpenseSaga";

export class CreateExpenseTransactionService implements ISubscriber<ExpenseRequestedEvent> {
  public static Instance = new CreateExpenseTransactionService();
  public Process(event: ExpenseRequestedEvent): void {
    // Start New Saga
    const saga = new CreateExpenseSaga();
    saga.expenseRequestedEvent = event;
    SagaStore.Instance.SaveSaga(saga);
    // Submit New Transaction
    const transactionSubmittedEvent = new TransactionSubmittedEvent(saga.Name, saga.Id);
    transactionSubmittedEvent.Amount = event.Amount;
    transactionSubmittedEvent.Destination = undefined;
    transactionSubmittedEvent.LedgerId = event.LedgerId;
    transactionSubmittedEvent.Source = event.LedgerId;
    transactionSubmittedEvent.Type = "Expense";
    transactionSubmittedEvent.SagaId = saga.Id;
    transactionSubmittedEvent.SagaName = saga.Name;
    transactionSubmittedEvent.Publish();
  }
  public Subscribe() {
    Publisher.Instance.Subscribe(ExpenseRequestedEvent, this);
  }
}
