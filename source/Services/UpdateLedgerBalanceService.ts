import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { TransactionCreatedEvent } from "../Events/TransactionCreatedEvent";
import { LedgerProjection } from "../Projections/LedgerProjection";

export class UpdateLedgerBalanceService implements ISubscriber<TransactionCreatedEvent> {
  public static Instance: UpdateLedgerBalanceService = new UpdateLedgerBalanceService();
  public Process(event: TransactionCreatedEvent): void {
    const ledgerId = event.Transaction.LedgerId;
    const ledgerProjection = LedgerProjection.Get(ledgerId);
    ledgerProjection.Balance -= event.Transaction.Amount;
  }
  public Subscribe() {
    Publisher.Instance.Subscribe(TransactionCreatedEvent, this);
  }
}
