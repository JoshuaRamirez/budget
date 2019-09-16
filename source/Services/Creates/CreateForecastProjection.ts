import { Handler } from "../../Core/Handler";
import { ForecastCreatedEvent } from "../../Events/ForecastCreatedEvent";
import { ForecastRequestedEvent } from "../../Events/ForecastRequestedEvent";
import { ForecastProjection } from "../../Projections/ForecastProjection";

export class CreateForecastService extends Handler<ForecastRequestedEvent> {
  public static Instance = new CreateForecastService();
  private constructor() {
    super(ForecastRequestedEvent);
  }
  public Process(event: ForecastRequestedEvent) {
    // Create ForecastProjection
    const forecastProjection = new ForecastProjection();
    if (event.ForecastId) {
      forecastProjection.ReplaceId(event.ForecastId);
    }
    forecastProjection.Amount = event.Amount;
    forecastProjection.CategoryId = event.CategoryId;
    forecastProjection.Date = event.Date;
    forecastProjection.Notes = event.Notes;
    forecastProjection.PlannedDepositIds = event.PlannedDepositIds;
    forecastProjection.PlannedExpenseIds = event.PlannedExpenseIds;
    forecastProjection.PlannedForecastIds = event.PlannedForecastIds;
    forecastProjection.Project();
    // Publish ForecastCreatedEvent
    const forecastCreatedEvent = new ForecastCreatedEvent();
    forecastCreatedEvent.ForecastId = forecastProjection.Id;
    forecastCreatedEvent.Publish();
  }
}
