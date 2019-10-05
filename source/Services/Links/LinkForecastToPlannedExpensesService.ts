import { LinkManyToManyService } from "../../Core/LinkManyToManyService";
import { LinkForecastToPlannedExpensesRequestedEvent } from "../../Events/LinkForecastToPlannedExpensesRequestedEvent";
import { ForecastProjection } from "../../Projections/ForecastProjection";
import { PlannedExpenseProjection } from "../../Projections/PlannedExpenseProjection";

export class LinkForecastToPlannedExpensesService extends LinkManyToManyService<LinkForecastToPlannedExpensesRequestedEvent, LinkForecastToPlannedExpensesRequestedEvent> {
  public static Instance = new LinkForecastToPlannedExpensesService();
  private constructor() {
    super({
      EventType: LinkForecastToPlannedExpensesRequestedEvent,
      SubjectAggregationFieldName: "ForecastIds",
      SubjectIdFieldName: "ForecastId",
      SubjectType: ForecastProjection,
      TargetAggregationFieldName: "PlannedExpenseIds",
      TargetEvent: new LinkForecastToPlannedExpensesRequestedEvent(),
      TargetIdFieldName: "PlannedExpenseId",
      TargetType: PlannedExpenseProjection,
    });
  }
}
