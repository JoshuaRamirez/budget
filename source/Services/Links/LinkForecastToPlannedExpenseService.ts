import { LinkManyToOneService } from "../../Core/LinkManyToOneService";
import { ForecastCreatedEvent } from "../../Events/ForecastCreatedEvent";
import { LinkForecastToPlannedExpenseRequestedEvent } from "../../Events/LinkForecastToPlannedExpenseRequestedEvent";
import { ForecastProjection } from "../../Projections/ForecastProjection";
import { PlannedExpenseProjection } from "../../Projections/PlannedExpenseProjection";

export class LinkForecastToPlannedExpenseService extends LinkManyToOneService<LinkForecastToPlannedExpenseRequestedEvent> {
  public static Instance = new LinkForecastToPlannedExpenseService();
  private constructor() {
    super(
      {
        EventType: ForecastCreatedEvent,
        SubjectAggregationFieldName: "PlannedExpenseIds",
        SubjectIdFieldName: "ForecastId",
        SubjectType: ForecastProjection,
        TargetIdFieldName: "ForecastId",
        TargetType: PlannedExpenseProjection,
      },
    );
  }
}
