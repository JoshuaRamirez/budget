import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class LinkForecastToPlannedDepositRequestedEvent extends Event {
  public DepositId;
  public ForecastId;
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
