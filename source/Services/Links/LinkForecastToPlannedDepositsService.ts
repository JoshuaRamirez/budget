import { LinkManyToManyService } from "../../Core/LinkManyToManyService";
import { LinkForecastToPlannedDepositsRequestedEvent } from "../../Events/LinkForecastToPlannedDepositsRequestedEvent";
import { ForecastProjection } from "../../Projections/ForecastProjection";
import { PlannedDepositProjection } from "../../Projections/PlannedDepositProjection";

export class LinkForecastToPlannedDepositsService extends LinkManyToManyService<LinkForecastToPlannedDepositsRequestedEvent, LinkForecastToPlannedDepositsRequestedEvent> {
  public static Instance = new LinkForecastToPlannedDepositsService();
  private constructor() {
    super({
      EventType: LinkForecastToPlannedDepositsRequestedEvent,
      SubjectAggregationFieldName: "ForecastIds",
      SubjectIdFieldName: "ForecastId",
      SubjectType: ForecastProjection,
      TargetAggregationFieldName: "PlannedDepositIds",
      TargetEvent: new LinkForecastToPlannedDepositsRequestedEvent(),
      TargetIdFieldName: "PlannedDepositId",
      TargetType: PlannedDepositProjection,
    });
  }
}
