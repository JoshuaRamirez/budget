import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { LedgerRequestedEvent } from "../Events/LedgerRequestedEvent";
import { LedgerProjection } from "../Projections/LedgerProjection";

export class CreateLedgerService implements ISubscriber<LedgerRequestedEvent> {
  public static Instance = new CreateLedgerService();
  public Process(event: LedgerRequestedEvent) {
    // Create LedgerProjection
    const ledgerProjection = new LedgerProjection();
    ledgerProjection.Account = event.Account;
    ledgerProjection.Balance = 0;
    ledgerProjection.TransactionIds = [];
    ledgerProjection.Type = event.Type;
    ledgerProjection.Project();
  }
  public Subscribe() {
    Publisher.Instance.Subscribe(LedgerRequestedEvent, this);
  }
}
