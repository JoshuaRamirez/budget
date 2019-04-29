import { AccountRequestedEvent } from "../Events/AccountRequestedEvent";
import { LedgerRequestedEvent } from "../Events/LedgerRequestedEvent";
import { AccountProjection } from "../Projections/AccountProjection/AccountProjection";
import { AccountProjectionStore } from "../Projections/AccountProjection/AccountProjectionStore";

export class CreateAccountService {
  private accountProjectionStore: AccountProjectionStore = AccountProjectionStore.Instance;
  public Process(accountRequestedEvent: AccountRequestedEvent) {
    const createLedgerProjection = () => {
      const contract = new AccountProjection();
      contract.Name = accountRequestedEvent.Name;
      contract.Type = accountRequestedEvent.Type;
      const projection = this.accountProjectionStore.Project(contract);
      return projection;
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
