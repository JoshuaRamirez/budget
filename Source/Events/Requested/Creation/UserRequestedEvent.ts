import { Event } from "../../Core/Event";
import { Publisher } from "../../Core/Publisher";

export class UserRequestedEvent extends Event {
  public UserName: string;
  public Type: string;
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
