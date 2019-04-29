import { ISubscriber } from "../Core/ISubscriber";
import { ProjectionStore } from "../Core/ProjectionStore";
import { LedgerRequestedEvent } from "../Events/LedgerRequestedEvent";
import { LedgerProjection } from "../Projections/LedgerProjection";

export class CreateLedgerService implements ISubscriber<LedgerRequestedEvent> {
  public Process(ledgerRequestedEvent: LedgerRequestedEvent) {
    const createLedgerProjection = () => {
      const ledgerProjection = new LedgerProjection();
      ledgerProjection.Account = ledgerRequestedEvent.Account;
      ledgerProjection.Balance = 0;
      ledgerProjection.Transactions = [];
      ledgerProjection.Type = ledgerRequestedEvent.Type;
      ProjectionStore.Instance.Project(ledgerProjection);
    };
    createLedgerProjection();
  }
}
