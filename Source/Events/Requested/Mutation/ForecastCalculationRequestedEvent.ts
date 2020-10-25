import { Event } from "../../Core/Event";
import { Publisher } from "../../Core/Publisher";

export class ForecastCalculationRequestEvent extends Event {
  public EndDate: Date;
  public StartDate: Date;
  public StartingBalance: number = 0;
  public async Publish(): Promise<void> {
    if (this.StartDate !== undefined && this.EndDate !== undefined && this.StartingBalance !== undefined) {
      await Publisher.Instance.Publish(this);
    } else {
      throw Error("Event not valid.");
    }
    return new Promise((resolve, reject) => resolve());
  }
}
