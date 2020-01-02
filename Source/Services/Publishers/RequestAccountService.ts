import { UserCreatedEvent } from "../../Events/Created/UserCreatedEvent";
import { AccountRequestedEvent } from "../../Events/Requested/Creation/AccountRequestedEvent";
import { Continuation } from "../Core/Continuation";
import { ContinuationHandler } from "../Core/ContinuationHandler";

export class RequestAccountService extends Continuation {
  public static Instance = new RequestAccountService();
  private static makeAccountRequestedEvent(userCreatedEvent: UserCreatedEvent): AccountRequestedEvent {
    const accountRequestedEvent = new AccountRequestedEvent();
    accountRequestedEvent.AccountName = "Income";
    accountRequestedEvent.Type = "System";
    accountRequestedEvent.UserId = userCreatedEvent.UserId;
    return accountRequestedEvent;
  }
  constructor() {
    super();
    const continuationHandler = new ContinuationHandler(UserCreatedEvent, RequestAccountService.makeAccountRequestedEvent);
    this.Link(continuationHandler);
  }
}
