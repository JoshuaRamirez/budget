import { LedgerStartingBalanceUpdateRequestedEvent } from "../../Events/Requested/Mutation/LedgerStartingBalanceUpdateRequestedEvent";
import { LedgerProjection } from "../../Projections/LedgerProjection";
import { Handler } from "../Core/Handler";

export class UpdateLedgerStartingBalanceService extends Handler<LedgerStartingBalanceUpdateRequestedEvent> {
  public static Instance: UpdateLedgerStartingBalanceService = new UpdateLedgerStartingBalanceService();
  private constructor() {
    super(LedgerStartingBalanceUpdateRequestedEvent);
  }
  public Receive(event: LedgerStartingBalanceUpdateRequestedEvent): void {
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
