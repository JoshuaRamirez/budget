import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class AccountRequestedEvent extends Event {
  public AccountName: string;
  public Type: string;
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
