import { ISubscriber } from "../Core/ISubscriber";
import { ProjectionStore } from "../Core/ProjectionStore";
import { Publisher } from "../Core/Publisher";
import { TransactionCreatedEvent } from "../Events/TransactionCreatedEvent";
import { TransactionSubmittedEvent } from "../Events/TransactionSubmittedEvent";
import { LedgerProjection } from "../Projections/LedgerProjection";
import { TransactionProjection } from "../Projections/TransactionProjection";

export class CreateTransactionService implements ISubscriber<TransactionSubmittedEvent> {
  public static Instance = new CreateTransactionService();
  public Process(event: TransactionSubmittedEvent) {
    // TODO: Update below idiom flow
    let transactionProjection: TransactionProjection;
    const createTransactionProjection = () => {
      transactionProjection = new TransactionProjection();
      transactionProjection.Amount = event.Amount;
      transactionProjection.Destination = event.Destination;
      transactionProjection.LedgerId = event.LedgerId;
      transactionProjection.Source = event.Source;
      transactionProjection.Type = event.Type;
      ProjectionStore.Instance.Project(transactionProjection);
    };
    const updateLedgerProjection = () => {
      const ledgerId = event.LedgerId;
      const ledgerProjection = ProjectionStore.Instance.GetProjection(LedgerProjection, ledgerId);
      ledgerProjection.Balance -= transactionProjection.Amount;
      ledgerProjection.TransactionIds.push(transactionProjection.Id);
    };
    const publishTransactionCreated = () => {
      const newTransactionCreatedEvent = new TransactionCreatedEvent(event.SagaName, event.SagaId);
      newTransactionCreatedEvent.Transaction = transactionProjection;
      newTransactionCreatedEvent.Publish();
    };
    createTransactionProjection();
    updateLedgerProjection();
    publishTransactionCreated();
  }
  public Subscribe() {
    Publisher.Instance.Subscribe(TransactionSubmittedEvent, this);
  }
}
