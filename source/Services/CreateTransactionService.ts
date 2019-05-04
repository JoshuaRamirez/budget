import { ISubscriber } from "../Core/ISubscriber";
import { ProjectionStore } from "../Core/ProjectionStore";
import { Publisher } from "../Core/Publisher";
import { TransactionCreatedEvent } from "../Events/TransactionCreatedEvent";
import { TransactionRequestedEvent } from "../Events/TransactionRequestedEvent";
import { LedgerProjection } from "../Projections/LedgerProjection";
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
    // Update Ledger Projection Balance
    const ledgerId = event.LedgerId;
    const ledgerProjection = ProjectionStore.Instance.GetProjection(LedgerProjection, ledgerId);
    ledgerProjection.Balance -= transactionProjection.Amount;
    ledgerProjection.TransactionIds.push(transactionProjection.Id);
    // Publish Transaction Created
    const newTransactionCreatedEvent = new TransactionCreatedEvent(event.SagaName, event.SagaId);
    newTransactionCreatedEvent.Transaction = transactionProjection;
    newTransactionCreatedEvent.Publish();
  }
  public Subscribe() {
    Publisher.Instance.Subscribe(TransactionRequestedEvent, this);
  }
}
