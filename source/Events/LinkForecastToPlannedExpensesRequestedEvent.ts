import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class LinkForecastToPlannedExpensesRequestedEvent extends Event {
  public ForecastId;
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
