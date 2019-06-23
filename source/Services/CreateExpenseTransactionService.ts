import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { ExpenseRequestedEvent } from "../Events/ExpenseRequestedEvent";
import { TransactionRequestedEvent } from "../Events/TransactionRequestedEvent";
import { CreateExpenseSaga } from "../Sagas/CreateExpenseSaga";

export class CreateExpenseTransactionService implements ISubscriber<ExpenseRequestedEvent> {
  public static Instance = new CreateExpenseTransactionService();
  private handles = [];
  public Process(event: ExpenseRequestedEvent): void {
    // Start New Saga
    const saga = new CreateExpenseSaga(event);
    saga.Save();
    // Publish NewTransactionRequestedEvent
    const transactionRequestedEvent = new TransactionRequestedEvent(saga.Name, saga.Id);
    transactionRequestedEvent.Amount = event.Amount;
    transactionRequestedEvent.Destination = undefined;
    transactionRequestedEvent.LedgerId = event.LedgerId;
    transactionRequestedEvent.Source = event.LedgerId;
    transactionRequestedEvent.Type = "Expense";
    transactionRequestedEvent.Publish();
  }
  public Subscribe() {
    const handle = Publisher.Instance.Subscribe(ExpenseRequestedEvent, this);
    this.handles.push(handle);
  }
  public UnSubscribe() {
    this.handles.forEach((handle) => {
      Publisher.Instance.UnSubscribe(ExpenseRequestedEvent, handle);
    });
  }
}
