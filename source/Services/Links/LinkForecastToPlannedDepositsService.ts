import { LinkManyToManyService } from "../../Core/LinkManyToManyService";
import { LinkForecastToPlannedDepositsRequestedEvent } from "../../Events/LinkForecastToPlannedDepositsRequestedEvent";
import { ForecastProjection } from "../../Projections/ForecastProjection";
import { PlannedDepositProjection } from "../../Projections/PlannedDepositProjection";

export class LinkForecastToPlannedDepositsService extends LinkManyToManyService<LinkForecastToPlannedDepositsRequestedEvent, LinkForecastToPlannedDepositsRequestedEvent> {
  public static Instance = new LinkForecastToPlannedDepositsService();
  private constructor() {
    super(
      LinkForecastToPlannedDepositsRequestedEvent,
      ForecastProjection,
      "ForecastId",
      "ForecastIds",
      PlannedDepositProjection,
      "PlannedDepositId",
      "PlannedDepositIds",
      new LinkForecastToPlannedDepositsRequestedEvent(),
    );
  }
}
