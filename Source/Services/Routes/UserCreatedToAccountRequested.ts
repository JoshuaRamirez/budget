import { MapUserCreatedEventToAccountRequestedEvent } from "../../Events/Core/Mappers";
import { UserCreatedEvent } from "../../Events/Created/UserCreatedEvent";
import { AccountRequestedEvent } from "../../Events/Requested/Creation/AccountRequestedEvent";
import { Route } from "../Core/Route";
import { Router } from "../Core/Router";

export class UserCreatedToAccountRequested extends Route<UserCreatedEvent, AccountRequestedEvent> {
  public static Instance = new UserCreatedToAccountRequested();
  constructor() {
    super(UserCreatedEvent, (userCreatedEvent) => {
      const accountRequestedEvent = MapUserCreatedEventToAccountRequestedEvent(userCreatedEvent);
      return accountRequestedEvent;
    });
    Router.Instance.Link(this);
  }
}
