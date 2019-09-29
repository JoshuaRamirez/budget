import { Handler } from "../../Core/Handler";
import { UserCreatedEvent } from "../../Events/UserCreatedEvent";
import { UserRequestedEvent } from "../../Events/UserRequestedEvent";
import { UserProjection } from "../../Projections/UserProjection";

export class CreateUserService extends Handler<UserRequestedEvent> {
  public static Instance = new CreateUserService();
  private constructor() {
    super(UserRequestedEvent);
  }
  public Handle(event: UserRequestedEvent) {
    // Create UserProjection
    const userProjection = new UserProjection();
    userProjection.UserName = event.UserName;
    userProjection.Type = event.Type;
    userProjection.Project();
    // Publish UserCreatedEvent
    const userCreatedEvent = new UserCreatedEvent();
    userCreatedEvent.UserId = userProjection.Id;
    userCreatedEvent.Publish();
  }
}
