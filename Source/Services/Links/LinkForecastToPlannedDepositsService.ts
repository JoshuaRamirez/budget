import { ForecastCreatedEvent } from "../../Events/Created/ForecastCreatedEvent";
import { ForecastProjection } from "../../Projections/ForecastProjection";
import { PlannedDepositProjection } from "../../Projections/PlannedDepositProjection";
import { LinkManySubjectsToManyTargetsDeclaration } from "./Core/LinkManySubjectsToManyTargetsDeclaration";
import { LinkService } from "./Core/LinkService";

export class LinkForecastToPlannedDepositsService
extends LinkService<ForecastCreatedEvent, ForecastProjection, PlannedDepositProjection> {
  public static Instance = new LinkForecastToPlannedDepositsService();
  private constructor() {
    const declaration = new
    LinkManySubjectsToManyTargetsDeclaration<ForecastCreatedEvent, ForecastProjection, PlannedDepositProjection>
    ({
      EventType: ForecastCreatedEvent,
      SubjectIdFieldName: "ForecastId",
      SubjectTargetIdsFieldName: "PlannedDepositIds",
      SubjectType: ForecastProjection,
      TargetSubjectIdsFieldName: "ForecastIds",
      TargetType: PlannedDepositProjection,
    });
    super(declaration);
  }
  public Handle(event: ForecastCreatedEvent): void {
    super.Handle(event);
  }
}
