import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";
import { ForecastProjection } from "../Projections/ForecastProjection";

export class ForecastRequestedEvent extends Event {
  public Amount: number;
  public CategoryId: any;
  public Date: Date;
  public ForecastId: any;
  public Notes: string;
  public PlannedDepositIds: any[];
  public PlannedExpenseIds: any[];
  public PlannedForecastIds: any[];
  constructor(forecastProjection: ForecastProjection) {
    super();
    this.Amount = forecastProjection.Amount;
    this.CategoryId = forecastProjection.CategoryId;
    this.Date = forecastProjection.Date;
    this.ForecastId = forecastProjection.Id;
    this.Notes = forecastProjection.Notes;
    this.PlannedDepositIds = forecastProjection.PlannedDepositIds;
    this.PlannedExpenseIds = forecastProjection.PlannedExpenseIds;
    this.PlannedForecastIds = forecastProjection.PlannedForecastIds;
  }
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}
