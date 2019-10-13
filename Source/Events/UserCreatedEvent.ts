import { Event } from "./Core/Event";
import { Publisher } from "./Core/Publisher";

export class UserCreatedEvent extends Event {
  public UserId: any;
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
