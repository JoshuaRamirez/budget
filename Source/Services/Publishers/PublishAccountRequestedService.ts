import { AccountRequestedEvent } from "../../Events/AccountRequestedEvent";
import { UserCreatedEvent } from "../../Events/UserCreatedEvent";
import { EventChain } from "../Core/EventChain";
import { EventLink } from "../Core/EventLink";

export class PublishAccountRequestedService extends EventChain {
  public static Instance = new PublishAccountRequestedService();
  private static makeAccountRequestedEvent(userCreatedEvent: UserCreatedEvent): AccountRequestedEvent {
    const accountRequestedEvent = new AccountRequestedEvent();
    accountRequestedEvent.AccountName = "Income";
    accountRequestedEvent.Type = "System";
    accountRequestedEvent.UserId = userCreatedEvent.UserId;
    return accountRequestedEvent;
  }
  constructor() {
    super();
    const eventLink = new EventLink(UserCreatedEvent, PublishAccountRequestedService.makeAccountRequestedEvent);
    this.Link(eventLink);
  }
}
