import { LedgerRequestedEvent } from "../Events/LedgerRequestedEvent";
import { LedgerProjection } from "../Projections/LedgerProjection";
import { LedgerProjectionStore } from "../ProjectionStores/LedgerProjectionStore";

export class CreateLedgerService {
  private ledgerProjectionStore: LedgerProjectionStore = LedgerProjectionStore.Instance;
  public Process(ledgerRequestedEvent: LedgerRequestedEvent) {
    const createLedgerProjection = () => {
      const newLedger = new LedgerProjection();
      newLedger.Account = ledgerRequestedEvent.Account;
      newLedger.Balance = 0;
      newLedger.Transactions = [];
      newLedger.Type = ledgerRequestedEvent.Type;
      this.ledgerProjectionStore.Project(newLedger);
    };
    createLedgerProjection();
  }
}
