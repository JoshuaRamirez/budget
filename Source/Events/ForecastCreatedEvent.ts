import { Event } from "./Core/Event";
import { Publisher } from "./Core/Publisher";

export class ForecastCreatedEvent extends Event {
  public ForecastId: any;
  public PlannedDepositIds: any[];
  public PlannedExpenseIds: any[];
  public Publish(): void {
    Publisher.Instance.Publish(this);
  }
}
