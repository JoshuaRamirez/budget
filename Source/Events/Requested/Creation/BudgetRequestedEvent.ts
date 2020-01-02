import { Event } from "../../Core/Event";
import { Publisher } from "../../Core/Publisher";

export class BudgetRequestedEvent extends Event {
  public BudgetName: string;
  public SubBudgetIds: any[];
  public SuperBudgetIds: any[];
  public Type: string;
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
