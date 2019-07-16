import { Handler } from "../Core/Handler";
import { ExpenseRequestedEvent } from "../Events/ExpenseRequestedEvent";
import { TransactionRequestedEvent } from "../Events/TransactionRequestedEvent";
import { CreateExpenseSaga } from "../Sagas/CreateExpenseSaga";

export class RequestExpenseTransactionService extends Handler<ExpenseRequestedEvent> {
  public static Instance = new RequestExpenseTransactionService();
  private constructor() {
    super(ExpenseRequestedEvent);
  }
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
}
