import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class AccountRequestedEvent extends Event {
  public Name: string;
  public Type: string;
  constructor() {
    super(AccountRequestedEvent.name);
  }
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
