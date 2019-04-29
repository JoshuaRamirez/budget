import { ISubscriber } from "../Core/ISubscriber";
import { ProjectionStore } from "../Core/ProjectionStore";
import { LedgerRequestedEvent } from "../Events/LedgerRequestedEvent";
import { LedgerProjection } from "../Projections/LedgerProjection";

export class CreateLedgerService implements ISubscriber<LedgerRequestedEvent> {
  public Process(event: LedgerRequestedEvent) {
    const createLedgerProjection = () => {
      const ledgerProjection = new LedgerProjection();
      ledgerProjection.Account = event.Account;
      ledgerProjection.Balance = 0;
      ledgerProjection.TransactionIds = [];
      ledgerProjection.Type = event.Type;
      ProjectionStore.Instance.Project(ledgerProjection);
    };
    createLedgerProjection();
  }
}
