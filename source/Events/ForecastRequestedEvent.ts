import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class ForecastRequestedEvent extends Event {
  public StartDate: Date;
  public EndDate: Date;
  public StartingBalance: number;
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
