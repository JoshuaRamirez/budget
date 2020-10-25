import { AccountCreatedEvent } from "../../Events/Created/AccountCreatedEvent";
import { AccountRequestedEvent } from "../../Events/Requested/Creation/AccountRequestedEvent";
import { AccountProjection } from "../../Projections/AccountProjection";
import { Receiver } from "../Core/Receiver";

export class CreateAccountService extends Receiver<AccountRequestedEvent> {
  public static Instance = new CreateAccountService();
  private constructor() {
    super(AccountRequestedEvent);
  }
  public async Receive(event: AccountRequestedEvent): Promise<void> {
    // Create AccountProjection
    const accountProjection = new AccountProjection();
    accountProjection.AccountName = event.AccountName;
    accountProjection.Type = event.Type;
    accountProjection.UserId = event.UserId;
    await accountProjection.Project();
    // Publish AccountCreatedEvent
    const accountCreated = new AccountCreatedEvent();
    accountCreated.AccountId = accountProjection.Id;
    await accountCreated.Publish();
    return new Promise((resolve, reject) => resolve());
  }
}
