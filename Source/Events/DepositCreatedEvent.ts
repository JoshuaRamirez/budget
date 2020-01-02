import { Event } from "./Core/Event";
import { Publisher } from "./Core/Publisher";

export class DepositCreatedEvent extends Event {
  public DepositId: any;
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
