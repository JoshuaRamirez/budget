import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class LinkForecastToPlannedExpenseRequestedEvent extends Event {
  public ExpenseId;
  public ForecastId;
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
