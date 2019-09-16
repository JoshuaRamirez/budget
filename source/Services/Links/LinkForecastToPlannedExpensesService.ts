import { LinkManyToManyService } from "../../Core/LinkManyToManyService";
import { LinkForecastToPlannedExpensesRequestedEvent } from "../../Events/LinkForecastToPlannedExpensesRequestedEvent";
import { ForecastProjection } from "../../Projections/ForecastProjection";
import { PlannedExpenseProjection } from "../../Projections/PlannedExpenseProjection";

export class LinkForecastToPlannedExpensesService extends LinkManyToManyService<LinkForecastToPlannedExpensesRequestedEvent, LinkForecastToPlannedExpensesRequestedEvent> {
  public static Instance = new LinkForecastToPlannedExpensesService();
  private constructor() {
    super(
      LinkForecastToPlannedExpensesRequestedEvent,
      ForecastProjection,
      "ForecastId",
      "ForecastIds",
      PlannedExpenseProjection,
      "PlannedExpenseId",
      "PlannedExpenseIds",
      new LinkForecastToPlannedExpensesRequestedEvent(),
    );
  }
}
