import { Handler } from "../Core/Handler";
import { TransactionCreatedEvent } from "../Events/TransactionCreatedEvent";
import { LedgerProjection } from "../Projections/LedgerProjection";

// TODO: Rename Link L to T to Add T to L
export class LinkLedgerToTransactionService extends Handler<TransactionCreatedEvent> {
  public static Instance: LinkLedgerToTransactionService = new LinkLedgerToTransactionService();
  constructor() {
    super(TransactionCreatedEvent);
  }
  public Process(event: TransactionCreatedEvent): void {
    const ledgerId = event.Transaction.LedgerId;
    const ledgerProjection = LedgerProjection.Get(ledgerId);
    ledgerProjection.TransactionIds.push(event.Transaction.Id);
  }
}
