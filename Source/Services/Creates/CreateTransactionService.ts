import { TransactionCreatedEvent } from "../../Events/Created/TransactionCreatedEvent";
import { TransactionRequestedEvent } from "../../Events/Requested/Creation/TransactionRequestedEvent";
import { TransactionProjection } from "../../Projections/TransactionProjection";
import { Receiver } from "../Core/Receiver";

export class CreateTransactionService extends Receiver<TransactionRequestedEvent> {
  public static Instance = new CreateTransactionService();
  private constructor() {
    super(TransactionRequestedEvent);
  }
  public Receive(event: TransactionRequestedEvent) {
    // Create TransactionProjection
    const transactionProjection = new TransactionProjection();
    transactionProjection.Amount = event.Amount;
    transactionProjection.Destination = event.Destination;
    transactionProjection.LedgerId = event.LedgerId;
    transactionProjection.Source = event.Source;
    transactionProjection.Type = event.Type;
    transactionProjection.Project();
    // Publish TransactionCreatedEvent
    const newTransactionCreatedEvent = new TransactionCreatedEvent();
    newTransactionCreatedEvent.TransactionId = transactionProjection.Id;
    newTransactionCreatedEvent.Publish();
  }
}
