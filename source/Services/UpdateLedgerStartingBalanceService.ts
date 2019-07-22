import { Handler } from "../Core/Handler";
import { LedgerStartingBalanceUpdateRequestedEvent } from "../Events/LedgerStartingBalanceUpdateRequestedEvent";
import { LedgerProjection } from "../Projections/LedgerProjection";

export class UpdateLedgerStartingBalanceService extends Handler<LedgerStartingBalanceUpdateRequestedEvent> {
  public static Instance: UpdateLedgerStartingBalanceService = new UpdateLedgerStartingBalanceService();
  private constructor() {
    super(LedgerStartingBalanceUpdateRequestedEvent);
  }
  public Process(event: LedgerStartingBalanceUpdateRequestedEvent): void {
    if (!event.LedgerId) {
      return;
    }
    const ledger = LedgerProjection.Get(event.LedgerId);
    if (ledger.StartingBalance !== 0) {
      ledger.Balance -= ledger.StartingBalance;
    }
    ledger.StartingBalance = event.StartingBalance;
    ledger.Balance += ledger.StartingBalance;
    ledger.Update();
  }
}
