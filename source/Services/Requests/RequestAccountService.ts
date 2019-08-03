import { EventChain } from "../../Core/EventChain";
import { EventLink } from "../../Core/EventLink";
import { AccountRequestedEvent } from "../../Events/AccountRequestedEvent";
import { UserCreatedEvent } from "../../Events/UserCreatedEvent";

export class RequestAccountService extends EventChain {
  public static Instance = new RequestAccountService();
  constructor() {
    super();
    this.Link(new EventLink(UserCreatedEvent, this.onUserCreated));
  }
  private onUserCreated(userCreatedEvent: UserCreatedEvent) {
    const accountRequestedEvent = new AccountRequestedEvent();
    accountRequestedEvent.AccountName = "Income";
    accountRequestedEvent.Type = "System";
    accountRequestedEvent.UserId = userCreatedEvent.UserId;
    return accountRequestedEvent;
  }
}
