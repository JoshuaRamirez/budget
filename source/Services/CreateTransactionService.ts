import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { TransactionCreatedEvent } from "../Events/TransactionCreatedEvent";
import { TransactionRequestedEvent } from "../Events/TransactionRequestedEvent";
import { TransactionProjection } from "../Projections/TransactionProjection";

export class CreateTransactionService implements ISubscriber<TransactionRequestedEvent> {
  public static Instance = new CreateTransactionService();
  public Process(event: TransactionRequestedEvent) {
    // Create Transaction Projection
    const transactionProjection = new TransactionProjection();
    transactionProjection.Amount = event.Amount;
    transactionProjection.Destination = event.Destination;
    transactionProjection.LedgerId = event.LedgerId;
    transactionProjection.Source = event.Source;
    transactionProjection.Type = event.Type;
    transactionProjection.Project();
    // Publish Transaction Created
    const newTransactionCreatedEvent = new TransactionCreatedEvent(event.SagaName, event.SagaId);
    newTransactionCreatedEvent.Transaction = transactionProjection;
    newTransactionCreatedEvent.Publish();
  }
  public Subscribe() {
    Publisher.Instance.Subscribe(TransactionRequestedEvent, this);
  }
}
