import { Event } from "../../Core/Event";
import { Publisher } from "../../Core/Publisher";

export class ForecastCalculationRequestEvent extends Event {
  public EndDate: Date;
  public StartDate: Date;
  public StartingBalance: number = 0;
  public Publish() {
    if (this.StartDate !== undefined && this.EndDate !== undefined && this.StartingBalance !== undefined) {
      Publisher.Instance.Publish(this);
    } else {
      throw Error("Event not valid.");
    }
  }
}
