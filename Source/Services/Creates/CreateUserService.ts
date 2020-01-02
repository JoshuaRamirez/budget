import { UserCreatedEvent } from "../../Events/Created/UserCreatedEvent";
import { UserRequestedEvent } from "../../Events/Requested/Creation/UserRequestedEvent";
import { UserProjection } from "../../Projections/UserProjection";
import { Receiver } from "../Core/Receiver";

export class CreateUserService extends Receiver<UserRequestedEvent> {
  public static Instance = new CreateUserService();
  private constructor() {
    super(UserRequestedEvent);
  }
  public Receive(event: UserRequestedEvent) {
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
