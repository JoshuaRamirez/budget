import { TransactionCreatedEvent } from "../../Events/Created/TransactionCreatedEvent";
import { LedgerProjection } from "../../Projections/LedgerProjection";
import { TransactionProjection } from "../../Projections/TransactionProjection";
import { Handler } from "../Core/Handler";

export class UpdateLedgerBalanceService extends Handler<TransactionCreatedEvent> {
  public static Instance: UpdateLedgerBalanceService = new UpdateLedgerBalanceService();
  private constructor() {
    super(TransactionCreatedEvent);
  }
  public Handle(event: TransactionCreatedEvent): void {
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
    ledgerProjection.Balance -= transactionProjection.Amount;
    ledgerProjection.Update();
  }
}
