import { ForecastCreatedEvent } from "../../Events/Created/ForecastCreatedEvent";
import { ForecastRequestedEvent } from "../../Events/Requested/Creation/ForecastRequestedEvent";
import { ForecastProjection } from "../../Projections/ForecastProjection";
import { Receiver } from "../Core/Receiver";

export class CreateForecastService extends Receiver<ForecastRequestedEvent> {
  public static Instance = new CreateForecastService();
  private constructor() {
    super(ForecastRequestedEvent);
  }
  public async Receive(event: ForecastRequestedEvent): Promise<void> {
    // Create ForecastProjection
    const forecastProjection = new ForecastProjection();
    forecastProjection.Amount = event.Amount;
    forecastProjection.CategoryId = event.CategoryId;
    forecastProjection.Date = event.Date;
    forecastProjection.Notes = event.Notes;
    forecastProjection.PlannedDepositIds = event.PlannedDepositIds;
    forecastProjection.PlannedExpenseIds = event.PlannedExpenseIds;
    await forecastProjection.Project();
    // Publish ForecastCreatedEvent
    const forecastCreatedEvent = new ForecastCreatedEvent();
    forecastCreatedEvent.ForecastId = forecastProjection.Id;
    await forecastCreatedEvent.Publish();
    return new Promise((resolve, reject) => resolve());
  }
}
