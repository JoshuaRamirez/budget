import { TransactionCreatedEvent } from "../../Events/TransactionCreatedEvent";
import { TransactionRequestedEvent } from "../../Events/TransactionRequestedEvent";
import { TransactionProjection } from "../../Projections/TransactionProjection";
import { Handler } from "../Core/Handler";

export class CreateTransactionService extends Handler<TransactionRequestedEvent> {
  public static Instance = new CreateTransactionService();
  private constructor() {
    super(TransactionRequestedEvent);
  }
  public Handle(event: TransactionRequestedEvent) {
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
    newTransactionCreatedEvent.LedgerId = transactionProjection.LedgerId;
    newTransactionCreatedEvent.Publish();
  }
}
