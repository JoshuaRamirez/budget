import { EventChain } from "../../Core/EventChain";
import { EventLink } from "../../Core/EventLink";
import { AccountRequestedEvent } from "../../Events/AccountRequestedEvent";
import { UserCreatedEvent } from "../../Events/UserCreatedEvent";

export class PublishAccountRequestedService extends EventChain {
  public static Instance = new PublishAccountRequestedService();
  constructor() {
    super();
    this.Link(new EventLink(UserCreatedEvent, this.onUserCreated));
  }
  private onUserCreated(userCreatedEvent: UserCreatedEvent): AccountRequestedEvent {
    const accountRequestedEvent = new AccountRequestedEvent();
    accountRequestedEvent.AccountName = "Income";
    accountRequestedEvent.Type = "System";
    accountRequestedEvent.UserId = userCreatedEvent.UserId;
    return accountRequestedEvent;
  }
}
