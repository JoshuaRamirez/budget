import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { TransactionCreatedEvent } from "../Events/TransactionCreatedEvent";
import { LedgerProjection } from "../Projections/LedgerProjection";

// TODO: Consider making constructor private so that the singleton is the only one with handles.
export class UpdateLedgerBalanceService implements ISubscriber<TransactionCreatedEvent> {
  public static Instance: UpdateLedgerBalanceService = new UpdateLedgerBalanceService();
  private handles = [];
  public Process(event: TransactionCreatedEvent): void {
    const ledgerId = event.Transaction.LedgerId;
    const ledgerProjection = LedgerProjection.Get(ledgerId);
    ledgerProjection.Balance -= event.Transaction.Amount;
  }
  public Subscribe() {
    const handle = Publisher.Instance.Subscribe(TransactionCreatedEvent, this);
    this.handles.push(handle);
  }
  public UnSubscribe() {
    this.handles.forEach((handle) => {
      Publisher.Instance.UnSubscribe(TransactionCreatedEvent, handle);
    });
  }
}
