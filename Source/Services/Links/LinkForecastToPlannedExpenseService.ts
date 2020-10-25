import { ForecastCreatedEvent } from "../../Events/Created/ForecastCreatedEvent";
import { ForecastProjection } from "../../Projections/ForecastProjection";
import { PlannedExpenseProjection } from "../../Projections/PlannedExpenseProjection";
import { LinkManySubjectsToManyTargetsDeclaration } from "./Core/LinkManySubjectsToManyTargetsDeclaration";
import { LinkService } from "./Core/LinkService";

export class LinkForecastToPlannedExpenseService extends LinkService<ForecastCreatedEvent, ForecastProjection, PlannedExpenseProjection> {
  public static Instance = new LinkForecastToPlannedExpenseService();
  private constructor() {
    const declaration = new LinkManySubjectsToManyTargetsDeclaration<ForecastCreatedEvent, ForecastProjection, PlannedExpenseProjection>({
      EventType: ForecastCreatedEvent,
      SubjectIdFieldName: "ForecastId",
      SubjectTargetIdsFieldName: "PlannedExpenseIds",
      SubjectType: ForecastProjection,
      TargetSubjectIdsFieldName: "ForecastIds",
      TargetType: PlannedExpenseProjection
    });
    super(declaration);
  }
  public async Receive(event: ForecastCreatedEvent): Promise<void> {
    await super.Receive(event);
    return new Promise((resolve, reject) => resolve());
  }
}
