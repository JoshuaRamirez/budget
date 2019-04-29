import { TransactionCreatedEvent } from "../Events/TransactionCreatedEvent";
import { TransactionSubmittedEvent } from "../Events/TransactionSubmittedEvent";
import { LedgerProjectionStore } from "../Projections/LedgerProjection/LedgerProjectionStore";
import { TransactionProjection } from "../Projections/TransactionProjection/TransactionProjection";

export class CreateTransactionService {
  private ledgerProjectionStore: LedgerProjectionStore = LedgerProjectionStore.Instance;
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
      const ledger = this.ledgerProjectionStore.GetById(ledgerId);
      ledger.Balance -= newTransaction.Amount;
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
