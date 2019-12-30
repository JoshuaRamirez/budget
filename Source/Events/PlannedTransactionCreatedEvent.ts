import { Event } from "./Core/Event";
import { Publisher } from "./Core/Publisher";

export class PlannedTransactionCreatedEvent extends Event {
  public PlannedTransactionId: any;
  public Publish(): void {
    Publisher.Instance.Publish(this);
  }
}
