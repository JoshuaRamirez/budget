import { ISubscriber } from "../Core/ISubscriber";
import { ProjectionStore } from "../Core/ProjectionStore";
import { Publisher } from "../Core/Publisher";
import { LedgerRequestedEvent } from "../Events/LedgerRequestedEvent";
import { LedgerProjection } from "../Projections/LedgerProjection";

export class CreateLedgerService implements ISubscriber<LedgerRequestedEvent> {
  public static Instance = new CreateLedgerService();
  public Process(event: LedgerRequestedEvent) {
    // Create Ledger Projection
    const ledgerProjection = new LedgerProjection();
    ledgerProjection.Account = event.Account;
    ledgerProjection.Balance = 0;
    ledgerProjection.TransactionIds = [];
    ledgerProjection.Type = event.Type;
    ProjectionStore.Instance.Project(ledgerProjection);
  }
  public Subscribe() {
    Publisher.Instance.Subscribe(LedgerRequestedEvent, this);
  }
}
