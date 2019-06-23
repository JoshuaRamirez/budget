import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { AccountRequestedEvent } from "../Events/AccountRequestedEvent";
import { LedgerRequestedEvent } from "../Events/LedgerRequestedEvent";
import { AccountProjection } from "../Projections/AccountProjection";

export class CreateAccountService implements ISubscriber<AccountRequestedEvent> {
  public static Instance = new CreateAccountService();
  private handles = [];
  public Process(event: AccountRequestedEvent) {
    // Create AccountProjection
    const accountProjection = new AccountProjection();
    accountProjection.AccountName = event.AccountName;
    accountProjection.Type = event.Type;
    accountProjection.Project();
    // Publish LedgerRequestedEvent
    const ledgerRequestedEvent = new LedgerRequestedEvent();
    ledgerRequestedEvent.Account = accountProjection;
    ledgerRequestedEvent.Type = "Account";
    ledgerRequestedEvent.Publish();
  }
  public Subscribe() {
    const handle = Publisher.Instance.Subscribe(AccountRequestedEvent, this);
    this.handles.push(handle);
  }
  public UnSubscribe() {
    this.handles.forEach((handle) => {
      Publisher.Instance.UnSubscribe(AccountRequestedEvent, handle);
    });
  }
}
