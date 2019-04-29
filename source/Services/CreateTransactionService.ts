import { ProjectionStore } from "../Core/ProjectionStore";
import { TransactionCreatedEvent } from "../Events/TransactionCreatedEvent";
import { TransactionSubmittedEvent } from "../Events/TransactionSubmittedEvent";
import { LedgerProjection } from "../Projections/LedgerProjection";
import { TransactionProjection } from "../Projections/TransactionProjection";

export class CreateTransactionService {
  private projectionStore = ProjectionStore.Instance;
  public Process(transactionSubmittedEvent: TransactionSubmittedEvent) {
    let newTransaction: TransactionProjection;
    const createTransactionProjection = () => {
      const projection = new TransactionProjection();
      projection.Amount = transactionSubmittedEvent.Amount;
      projection.Destination = transactionSubmittedEvent.Destination;
      projection.LedgerId = transactionSubmittedEvent.LedgerId;
      projection.Source = transactionSubmittedEvent.Source;
      projection.Type = transactionSubmittedEvent.Type;
      newTransaction = projection;
    };
    const updateLedgerProjection = () => {
      const ledgerId = transactionSubmittedEvent.LedgerId;
      const ledger = this.projectionStore.GetProjection(LedgerProjection, ledgerId);
      ledger.Balance -= newTransaction.Amount;
      ledger.Transactions.push(newTransaction);
    };
    const publishTransactionCreated = () => {
      const newTransactionCreatedEvent = new TransactionCreatedEvent();
      newTransactionCreatedEvent.Transaction = newTransaction;
      newTransactionCreatedEvent.SagaId = transactionSubmittedEvent.SagaId;
      newTransactionCreatedEvent.Publish(newTransactionCreatedEvent);
    };
    createTransactionProjection();
    updateLedgerProjection();
    publishTransactionCreated();
  }
}
