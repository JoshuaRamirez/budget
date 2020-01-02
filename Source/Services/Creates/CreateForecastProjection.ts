import { ForecastCreatedEvent } from "../../Events/Created/ForecastCreatedEvent";
import { ForecastRequestedEvent } from "../../Events/Requested/Creation/ForecastRequestedEvent";
import { ForecastProjection } from "../../Projections/ForecastProjection";
import { Handler } from "../Core/Handler";

export class CreateForecastService extends Handler<ForecastRequestedEvent> {
  public static Instance = new CreateForecastService();
  private constructor() {
    super(ForecastRequestedEvent);
  }
  public Receive(event: ForecastRequestedEvent) {
    // Create ForecastProjection
    const forecastProjection = new ForecastProjection();
    forecastProjection.Amount = event.Amount;
    forecastProjection.CategoryId = event.CategoryId;
    forecastProjection.Date = event.Date;
    forecastProjection.Notes = event.Notes;
    forecastProjection.PlannedDepositIds = event.PlannedDepositIds;
    forecastProjection.PlannedExpenseIds = event.PlannedExpenseIds;
    forecastProjection.Project();
    // Publish ForecastCreatedEvent
    const forecastCreatedEvent = new ForecastCreatedEvent();
    forecastCreatedEvent.ForecastId = forecastProjection.Id;
    forecastCreatedEvent.Publish();
  }
}
