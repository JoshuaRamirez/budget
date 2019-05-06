import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { LedgerStartingBalanceUpdateRequested } from "../Events/LedgerStartingBalanceUpdateRequested";
import { LedgerProjection } from "../Projections/LedgerProjection";

export class UpdateLedgerStartingBalance implements ISubscriber<LedgerStartingBalanceUpdateRequested> {
  public static Instance: UpdateLedgerStartingBalance = new UpdateLedgerStartingBalance();
  public Process(event: LedgerStartingBalanceUpdateRequested): void {
    const ledger = LedgerProjection.Get(event.LedgerId);
    if (ledger.StartingBalance !== 0) {
      ledger.Balance -= ledger.StartingBalance;
    }
    ledger.StartingBalance = event.StartingBalance;
    ledger.Balance += ledger.StartingBalance;
  }
  public Subscribe() {
    Publisher.Instance.Subscribe(LedgerStartingBalanceUpdateRequested, this);
  }
}
