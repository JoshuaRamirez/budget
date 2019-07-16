import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { TransactionCreatedEvent } from "../Events/TransactionCreatedEvent";
import { TransactionRequestedEvent } from "../Events/TransactionRequestedEvent";
import { TransactionProjection } from "../Projections/TransactionProjection";
import { CreateAllocationSaga } from "../Sagas/CreateAllocationSaga";
import { CreateExpenseSaga } from "../Sagas/CreateExpenseSaga";

export class CreateTransactionService implements ISubscriber<TransactionRequestedEvent> {
  public static Instance = new CreateTransactionService();
  private handles = [];
  public Process(event: TransactionRequestedEvent) {
    // Quit if Saga doesn't exist on Event
    if (!event.SagaId) {
      return;
    }
    // Quit if Saga doesn't match this Service
    if (
      event.SagaName !== CreateAllocationSaga.name &&
      event.SagaName !== CreateExpenseSaga.name
    ) {
      return;
    }
    // Create TransactionProjection
    const transactionProjection = new TransactionProjection();
    transactionProjection.Amount = event.Amount;
    transactionProjection.Destination = event.Destination;
    transactionProjection.LedgerId = event.LedgerId;
    transactionProjection.Source = event.Source;
    transactionProjection.Type = event.Type;
    transactionProjection.Project();
    // Publish TransactionCreatedEvent
    const newTransactionCreatedEvent = new TransactionCreatedEvent(event.SagaName, event.SagaId);
    newTransactionCreatedEvent.Transaction = transactionProjection;
    newTransactionCreatedEvent.Publish();
  }
  public Subscribe() {
    const handle = Publisher.Instance.Subscribe(TransactionRequestedEvent, this);
    this.handles.push(handle);
  }
  public UnSubscribe() {
    this.handles.forEach((handle) => {
      Publisher.Instance.UnSubscribe(TransactionRequestedEvent, handle);
    });
  }
}
