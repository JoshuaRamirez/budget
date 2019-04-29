import { ISubscriber } from "../Core/ISubscriber";
import { ProjectionStore } from "../Core/ProjectionStore";
import { AccountRequestedEvent } from "../Events/AccountRequestedEvent";
import { LedgerRequestedEvent } from "../Events/LedgerRequestedEvent";
import { AccountProjection } from "../Projections/AccountProjection";

export class CreateAccountService implements ISubscriber<AccountRequestedEvent> {
  public Process(accountRequestedEvent: AccountRequestedEvent) {
    const createLedgerProjection = () => {
      const accountProjection = new AccountProjection();
      accountProjection.Name = accountRequestedEvent.Name;
      accountProjection.Type = accountRequestedEvent.Type;
      ProjectionStore.Instance.Project(accountProjection);
      return accountProjection;
    };
    const requestNewLedger = (account) => {
      const ledgerRequestedEvent = new LedgerRequestedEvent();
      ledgerRequestedEvent.Account = account;
      ledgerRequestedEvent.Type = "Account";
      ledgerRequestedEvent.Publish();
    };
    const newAccount = createLedgerProjection();
    requestNewLedger(newAccount);
  }
}
