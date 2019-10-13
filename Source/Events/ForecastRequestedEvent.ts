import { ForecastProjection } from "../Projections/ForecastProjection";
import { Event } from "./Core/Event";
import { Publisher } from "./Core/Publisher";

export class ForecastRequestedEvent extends Event {
  public Amount: number;
  public CategoryId: any;
  public Date: Date;
  public ForecastId: any;
  public Notes: string;
  public PlannedDepositIds: any[];
  public PlannedExpenseIds: any[];
  constructor(forecastProjection: ForecastProjection) {
    super();
    this.Amount = forecastProjection.Amount;
    this.CategoryId = forecastProjection.CategoryId;
    this.Date = forecastProjection.Date;
    this.ForecastId = forecastProjection.Id;
    this.Notes = forecastProjection.Notes;
    this.PlannedDepositIds = forecastProjection.PlannedDepositIds;
    this.PlannedExpenseIds = forecastProjection.PlannedExpenseIds;
  }
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
