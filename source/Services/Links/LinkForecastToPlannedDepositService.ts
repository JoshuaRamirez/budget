import { LinkManyToManyToOneService } from "../../Core/LinkManyToManyToOneService";
import { LinkForecastToPlannedDepositRequestedEvent } from "../../Events/LinkForecastToPlannedDepositRequestedEvent";
import { ForecastProjection } from "../../Projections/ForecastProjection";
import { PlannedDepositProjection } from "../../Projections/PlannedDepositProjection";

export class LinkForecastToPlannedDepositService extends LinkManyToManyToOneService<LinkForecastToPlannedDepositRequestedEvent> {
  public static Instance = new LinkForecastToPlannedDepositService();
  private constructor() {
    super(
      LinkForecastToPlannedDepositRequestedEvent,
      ForecastProjection,
      "ForecastId",
      "ForecastIds",
      PlannedDepositProjection,
      "PlannedDepositIds",
    );
  }
}
