import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class BudgetCreatedEvent extends Event {
  public BudgetId: any;
  public Publish(): void {
    Publisher.Instance.Publish(this);
  }
}
