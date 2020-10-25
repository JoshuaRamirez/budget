import { Event } from "../../Core/Event";
import { Publisher } from "../../Core/Publisher";

export class BudgetRequestedEvent extends Event {
  public BudgetName: string;
  public SubBudgetIds: any[];
  public SuperBudgetIds: any[];
  public Type: string;
  public async Publish(): Promise<void> {
    await Publisher.Instance.Publish(this);
    return new Promise((resolve, reject) => resolve());
  }
}
