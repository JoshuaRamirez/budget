import { ForecastCreatedEvent } from "../../Events/ForecastCreatedEvent";
import { ForecastProjection } from "../../Projections/ForecastProjection";
import { PlannedExpenseProjection } from "../../Projections/PlannedExpenseProjection";
import { LinkManySubjectsToManyTargetsDeclaration } from "./Core/LinkManySubjectsToManyTargetsDeclaration";
import { LinkService } from "./Core/LinkService";

export class LinkForecastToPlannedExpensesService
extends LinkService<ForecastCreatedEvent, ForecastProjection, PlannedExpenseProjection> {
  public static Instance = new LinkForecastToPlannedExpensesService();
  private constructor() {
    const declaration = new
    LinkManySubjectsToManyTargetsDeclaration<ForecastCreatedEvent, ForecastProjection, PlannedExpenseProjection>
    ({
      EventType: ForecastCreatedEvent,
      SubjectIdFieldName: "ForecastId",
      SubjectTargetIdsFieldName: "PlannedExpenseIds",
      SubjectType: ForecastProjection,
      TargetSubjectIdsFieldName: "ForecastIds",
      TargetType: PlannedExpenseProjection,
    });
    super(declaration);
  }
  public Handle(event: ForecastCreatedEvent): void {
    super.Handle(event);
  }
}
