import { UserCreatedEvent } from "../../Events/Created/UserCreatedEvent";
import { AccountRequestedEvent } from "../../Events/Requested/Creation/AccountRequestedEvent";
import { Route } from "../Core/Route";
import { Router } from "../Core/Router";

export class RequestAccountService extends Router {
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
    const route = new Route(UserCreatedEvent, RequestAccountService.makeAccountRequestedEvent);
    this.Link(route);
  }
}
