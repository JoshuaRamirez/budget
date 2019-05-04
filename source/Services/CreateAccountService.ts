import { ISubscriber } from "../Core/ISubscriber";
import { ProjectionStore } from "../Core/ProjectionStore";
import { Publisher } from "../Core/Publisher";
import { AccountRequestedEvent } from "../Events/AccountRequestedEvent";
import { LedgerRequestedEvent } from "../Events/LedgerRequestedEvent";
import { AccountProjection } from "../Projections/AccountProjection";

export class CreateAccountService implements ISubscriber<AccountRequestedEvent> {
  public static Instance = new CreateAccountService();
  public Process(event: AccountRequestedEvent) {
    // Create Account Projection
    const accountProjection = new AccountProjection();
    accountProjection.Name = event.Name;
    accountProjection.Type = event.Type;
    ProjectionStore.Instance.Project(accountProjection);
    // Request Ledger
    const ledgerRequestedEvent = new LedgerRequestedEvent();
    ledgerRequestedEvent.Account = accountProjection;
    ledgerRequestedEvent.Type = "Account";
    ledgerRequestedEvent.Publish();
  }
  public Subscribe() {
    Publisher.Instance.Subscribe(AccountRequestedEvent, this);
  }
}
