import { TransactionCreatedEvent } from "../../Events/Created/TransactionCreatedEvent";
import { LedgerProjection } from "../../Projections/LedgerProjection";
import { TransactionProjection } from "../../Projections/TransactionProjection";
import { Receiver } from "../Core/Receiver";

export class UpdateLedgerBalanceService extends Receiver<TransactionCreatedEvent> {
  public static Instance: UpdateLedgerBalanceService = new UpdateLedgerBalanceService();
  private constructor() {
    super(TransactionCreatedEvent);
  }
  public async Receive(event: TransactionCreatedEvent): Promise<void> {
    if (!event.TransactionId) {
      return;
    }
    const transactionProjection = await TransactionProjection.Get(event.TransactionId);
    if (!transactionProjection) {
      return;
    }
    if (!transactionProjection.LedgerId) {
      return;
    }
    const ledgerId = transactionProjection.LedgerId;
    const ledgerProjection = await LedgerProjection.Get(ledgerId);
    ledgerProjection.Balance -= transactionProjection.Amount;
    await ledgerProjection.Update();
    return new Promise((resolve, reject) => resolve());
  }
}
