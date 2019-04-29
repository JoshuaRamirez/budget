import { ProjectionStore } from "../Core/ProjectionStore";
import { LedgerRequestedEvent } from "../Events/LedgerRequestedEvent";
import { LedgerProjection } from "../Projections/LedgerProjection";

export class CreateLedgerService {
  private projectionStore = ProjectionStore.Instance;
  public Process(ledgerRequestedEvent: LedgerRequestedEvent) {
    const createLedgerProjection = () => {
      const ledgerProjection = new LedgerProjection();
      ledgerProjection.Account = ledgerRequestedEvent.Account;
      ledgerProjection.Balance = 0;
      ledgerProjection.Transactions = [];
      ledgerProjection.Type = ledgerRequestedEvent.Type;
      this.projectionStore.Project(ledgerProjection);
    };
    createLedgerProjection();
  }
}
