import { UserCreatedEvent } from "../../Events/Created/UserCreatedEvent";
import { UserRequestedEvent } from "../../Events/Requested/Creation/UserRequestedEvent";
import { UserProjection } from "../../Projections/UserProjection";
import { Handler } from "../Core/Handler";

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
