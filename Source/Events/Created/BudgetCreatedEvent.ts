import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class BudgetCreatedEvent extends Event {
  public BudgetId: any;
  public async Publish(): Promise<void> {
    await Publisher.Instance.Publish(this);
    return new Promise((resolve, reject) => resolve());
  }
}
