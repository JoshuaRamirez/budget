import { AccountCreatedEvent } from "../../Events/Created/AccountCreatedEvent";
import { AccountRequestedEvent } from "../../Events/Requested/Creation/AccountRequestedEvent";
import { AccountProjection } from "../../Projections/AccountProjection";
import { Handler } from "../Core/Handler";

export class CreateAccountService extends Handler<AccountRequestedEvent> {
  public static Instance = new CreateAccountService();
  private constructor() {
    super(AccountRequestedEvent);
  }
  public Receive(event: AccountRequestedEvent) {
    // Create AccountProjection
    const accountProjection = new AccountProjection();
    accountProjection.AccountName = event.AccountName;
    accountProjection.Type = event.Type;
    accountProjection.UserId = event.UserId;
    accountProjection.Project();
    // Publish AccountCreatedEvent
    const accountCreated = new AccountCreatedEvent();
    accountCreated.AccountId = accountProjection.Id;
    accountCreated.Publish();
  }
}
