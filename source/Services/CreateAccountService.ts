import { ISubscriber } from "../Core/ISubscriber";
import { ProjectionStore } from "../Core/ProjectionStore";
import { AccountRequestedEvent } from "../Events/AccountRequestedEvent";
import { LedgerRequestedEvent } from "../Events/LedgerRequestedEvent";
import { AccountProjection } from "../Projections/AccountProjection";

export class CreateAccountService implements ISubscriber<AccountRequestedEvent> {
  public static Instance = new CreateAccountService();
  public Process(event: AccountRequestedEvent) {
    const createAccountProjection = () => {
      const accountProjection = new AccountProjection();
      accountProjection.Name = event.Name;
      accountProjection.Type = event.Type;
      ProjectionStore.Instance.Project(accountProjection);
      return accountProjection;
    };
    const requestNewLedger = (account) => {
      const ledgerRequestedEvent = new LedgerRequestedEvent();
      ledgerRequestedEvent.Account = account;
      ledgerRequestedEvent.Type = "Account";
      ledgerRequestedEvent.Publish();
    };
    const newAccount = createAccountProjection();
    requestNewLedger(newAccount);
  }
}
