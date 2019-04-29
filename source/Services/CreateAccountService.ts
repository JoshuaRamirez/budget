import { ProjectionStore } from "../Core/ProjectionStore";
import { AccountRequestedEvent } from "../Events/AccountRequestedEvent";
import { LedgerRequestedEvent } from "../Events/LedgerRequestedEvent";
import { AccountProjection } from "../Projections/AccountProjection";

export class CreateAccountService {
  private projectionStore = ProjectionStore.Instance;
  public Process(accountRequestedEvent: AccountRequestedEvent) {
    const createLedgerProjection = () => {
      const accountProjection = new AccountProjection();
      accountProjection.Name = accountRequestedEvent.Name;
      accountProjection.Type = accountRequestedEvent.Type;
      this.projectionStore.Project(accountProjection);
      return accountProjection;
    };
    const requestNewLedger = (account) => {
      const ledgerRequestedEvent = new LedgerRequestedEvent();
      ledgerRequestedEvent.Account = account;
      ledgerRequestedEvent.Type = "Account";
      ledgerRequestedEvent.Publish(ledgerRequestedEvent);
    };
    const newAccount = createLedgerProjection();
    requestNewLedger(newAccount);
  }
}
