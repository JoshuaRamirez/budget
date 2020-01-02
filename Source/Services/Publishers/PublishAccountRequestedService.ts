import { AccountRequestedEvent } from "../../Events/AccountRequestedEvent";
import { UserCreatedEvent } from "../../Events/UserCreatedEvent";
import { Continuation } from "../Core/Continuation";
import { ContinuationHandler } from "../Core/ContinuationHandler";

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
    const continuationHandler = new ContinuationHandler(UserCreatedEvent, PublishAccountRequestedService.makeAccountRequestedEvent);
    this.Link(continuationHandler);
  }
}
