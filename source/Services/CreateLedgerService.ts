import { Handler } from "../Core/Handler";
import { LedgerRequestedEvent } from "../Events/LedgerRequestedEvent";
import { LedgerProjection } from "../Projections/LedgerProjection";

export class CreateLedgerService extends Handler<LedgerRequestedEvent> {
  public static Instance = new CreateLedgerService();
  private constructor() {
    super(LedgerRequestedEvent);
  }
  public Process(event: LedgerRequestedEvent) {
    // Create LedgerProjection
    const ledgerProjection = new LedgerProjection();
    ledgerProjection.Account = event.Account;
    ledgerProjection.Balance = 0;
    ledgerProjection.TransactionIds = [];
    ledgerProjection.Type = event.Type;
    ledgerProjection.Project();
  }
}
