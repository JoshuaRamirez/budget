import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class PlannedExpenseCreatedEvent extends Event {
  public PlannedExpenseId: any;
  public Publish(): void {
    Publisher.Instance.Publish(this);
  }
}