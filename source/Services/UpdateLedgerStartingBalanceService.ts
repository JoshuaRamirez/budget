import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { LedgerStartingBalanceUpdateRequested } from "../Events/LedgerStartingBalanceUpdateRequested";
import { LedgerProjection } from "../Projections/LedgerProjection";

export class UpdateLedgerStartingBalanceService implements ISubscriber<LedgerStartingBalanceUpdateRequested> {
  public static Instance: UpdateLedgerStartingBalanceService = new UpdateLedgerStartingBalanceService();
  private handles = [];
  public Process(event: LedgerStartingBalanceUpdateRequested): void {
    const ledger = LedgerProjection.Get(event.LedgerId);
    if (ledger.StartingBalance !== 0) {
      ledger.Balance -= ledger.StartingBalance;
    }
    ledger.StartingBalance = event.StartingBalance;
    ledger.Balance += ledger.StartingBalance;
  }
  public Subscribe() {
    const handle = Publisher.Instance.Subscribe(LedgerStartingBalanceUpdateRequested, this);
    this.handles.push(handle);
  }
  public UnSubscribe() {
    this.handles.forEach((handle) => {
      Publisher.Instance.UnSubscribe(LedgerStartingBalanceUpdateRequested, handle);
    });
  }
}
