import { AccountRequestedEvent } from "../../Events/AccountRequestedEvent";
import { UserCreatedEvent } from "../../Events/UserCreatedEvent";
import { Continuation } from "../Core/Continuation";
import { EventLink } from "../Core/EventLink";

export class PublishAccountRequestedService extends Continuation {
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
