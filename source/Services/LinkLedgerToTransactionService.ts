import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { TransactionCreatedEvent } from "../Events/TransactionCreatedEvent";
import { LedgerProjection } from "../Projections/LedgerProjection";

export class LinkLedgerToTransactionService implements ISubscriber<TransactionCreatedEvent> {
  public static Instance: LinkLedgerToTransactionService = new LinkLedgerToTransactionService();
  public Process(event: TransactionCreatedEvent): void {
    const ledgerId = event.Transaction.LedgerId;
    const ledgerProjection = LedgerProjection.Get(ledgerId);
    ledgerProjection.TransactionIds.push(event.Transaction.Id);
  }
  public Subscribe() {
    Publisher.Instance.Subscribe(TransactionCreatedEvent, this);
  }
}
