import { Handler } from "../Core/Handler";
import { TransactionCreatedEvent } from "../Events/TransactionCreatedEvent";
import { LedgerProjection } from "../Projections/LedgerProjection";
import { TransactionProjection } from "../Projections/TransactionProjection";

// TODO: Rename Link L to T to Add T to L
export class LinkLedgerToTransactionService extends Handler<TransactionCreatedEvent> {
  public static Instance: LinkLedgerToTransactionService = new LinkLedgerToTransactionService();
  private constructor() {
    super(TransactionCreatedEvent);
  }
  public Process(event: TransactionCreatedEvent): void {
    if (!event.TransactionId) {
      return;
    }
    const transactionProjection = TransactionProjection.Get(event.TransactionId);
    if (!transactionProjection) {
      return;
    }
    if (!transactionProjection.LedgerId) {
      return;
    }
    const ledgerId = transactionProjection.LedgerId;
    const ledgerProjection = LedgerProjection.Get(ledgerId);
    ledgerProjection.TransactionIds.push(transactionProjection.Id);
  }
}
