import { Handler } from "../../Core/Handler";
import { AccountRequestedEvent } from "../../Events/AccountRequestedEvent";
import { LedgerRequestedEvent } from "../../Events/LedgerRequestedEvent";
import { AccountProjection } from "../../Projections/AccountProjection";

export class CreateAccountService extends Handler<AccountRequestedEvent> {
  public static Instance = new CreateAccountService();
  private constructor() {
    super(AccountRequestedEvent);
  }
  public Process(event: AccountRequestedEvent) {
    // Create AccountProjection
    const accountProjection = new AccountProjection();
    accountProjection.AccountName = event.AccountName;
    accountProjection.Type = event.Type;
    accountProjection.Project();
    // Publish LedgerRequestedEvent
    const ledgerRequestedEvent = new LedgerRequestedEvent();
    ledgerRequestedEvent.AccountId = accountProjection.Id;
    ledgerRequestedEvent.Type = "AccountId";
    ledgerRequestedEvent.Publish();
  }
}