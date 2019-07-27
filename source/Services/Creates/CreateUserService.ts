import { Handler } from "../../Core/Handler";
import { AccountRequestedEvent } from "../../Events/AccountRequestedEvent";
import { UserRequestedEvent } from "../../Events/UserRequestedEvent";
import { UserProjection } from "../../Projections/UserProjection";

export class CreateUserService extends Handler<UserRequestedEvent> {
  public static Instance = new CreateUserService();
  private constructor() {
    super(UserRequestedEvent);
  }
  public Process(event: UserRequestedEvent) {
    // Create UserProjection
    const userProjection = new UserProjection();
    userProjection.UserName = event.UserName;
    userProjection.Type = event.Type;
    userProjection.Project();
    // Publish AccountRequestedEvent
    const accountRequestedEvent = new AccountRequestedEvent();
    accountRequestedEvent.Type = "Income";
    accountRequestedEvent.AccountName = "Income";
    accountRequestedEvent.Publish();
  }
}
