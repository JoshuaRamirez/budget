import { ISubscriber } from "../Core/ISubscriber";
import { ProjectionStore } from "../Core/ProjectionStore";
import { TransactionCreatedEvent } from "../Events/TransactionCreatedEvent";
import { TransactionSubmittedEvent } from "../Events/TransactionSubmittedEvent";
import { LedgerProjection } from "../Projections/LedgerProjection";
import { TransactionProjection } from "../Projections/TransactionProjection";

export class CreateTransactionService implements ISubscriber<TransactionSubmittedEvent> {
  public Process(event: TransactionSubmittedEvent) {
    let newTransaction: TransactionProjection;
    const createTransactionProjection = () => {
      const projection = new TransactionProjection();
      projection.Amount = event.Amount;
      projection.Destination = event.Destination;
      projection.LedgerId = event.LedgerId;
      projection.Source = event.Source;
      projection.Type = event.Type;
      newTransaction = projection;
    };
    const updateLedgerProjection = () => {
      const ledgerId = event.LedgerId;
      const ledger = ProjectionStore.Instance.GetProjection(LedgerProjection, ledgerId);
      ledger.Balance -= newTransaction.Amount;
      ledger.Transactions.push(newTransaction);
    };
    const publishTransactionCreated = () => {
      const newTransactionCreatedEvent = new TransactionCreatedEvent();
      newTransactionCreatedEvent.Transaction = newTransaction;
      newTransactionCreatedEvent.SagaId = event.SagaId;
      newTransactionCreatedEvent.Publish();
    };
    createTransactionProjection();
    updateLedgerProjection();
    publishTransactionCreated();
  }
}
