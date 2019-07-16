import { Handler } from "../Core/Handler";
import { TransactionCreatedEvent } from "../Events/TransactionCreatedEvent";
import { LedgerProjection } from "../Projections/LedgerProjection";

// TODO: Consider making constructor private so that the singleton is the only one with handles.
export class UpdateLedgerBalanceService extends Handler<TransactionCreatedEvent> {
  public static Instance: UpdateLedgerBalanceService = new UpdateLedgerBalanceService();
  constructor() {
    super(TransactionCreatedEvent);
  }
  public Process(event: TransactionCreatedEvent): void {
    const ledgerId = event.Transaction.LedgerId;
    const ledgerProjection = LedgerProjection.Get(ledgerId);
    ledgerProjection.Balance -= event.Transaction.Amount;
  }
}
