import { LedgerStartingBalanceUpdateRequestedEvent } from "../../Events/Requested/Mutation/LedgerStartingBalanceUpdateRequestedEvent";
import { LedgerProjection } from "../../Projections/LedgerProjection";
import { Receiver } from "../Core/Receiver";

export class UpdateLedgerStartingBalanceService extends Receiver<LedgerStartingBalanceUpdateRequestedEvent> {
  public static Instance: UpdateLedgerStartingBalanceService = new UpdateLedgerStartingBalanceService();
  private constructor() {
    super(LedgerStartingBalanceUpdateRequestedEvent);
  }
  public async Receive(event: LedgerStartingBalanceUpdateRequestedEvent): Promise<void> {
    if (!event.LedgerId) {
      return;
    }
    const ledger = await LedgerProjection.Get(event.LedgerId);
    if (ledger.StartingBalance !== 0) {
      ledger.Balance -= ledger.StartingBalance;
    }
    ledger.StartingBalance = event.StartingBalance;
    ledger.Balance += ledger.StartingBalance;
    await ledger.Update();
    return new Promise((resolve, reject) => resolve());
  }
}
