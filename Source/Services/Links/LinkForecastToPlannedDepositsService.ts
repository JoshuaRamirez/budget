import { ForecastCreatedEvent } from "../../Events/ForecastCreatedEvent";
import { ForecastProjection } from "../../Projections/ForecastProjection";
import { PlannedDepositProjection } from "../../Projections/PlannedDepositProjection";
import { LinkManyToManyDeclaration } from "./Core/LinkManyToManyDeclaration";
import { LinkService } from "./Core/LinkService";

export class LinkForecastToPlannedDepositsService extends LinkService<ForecastCreatedEvent> {
  public static Instance = new LinkForecastToPlannedDepositsService();
  private constructor() {
    const declaration = new LinkManyToManyDeclaration({
      EventType: ForecastCreatedEvent,
      SubjectTargetIdsFieldName: "PlannedDepositIds",
      SubjectType: ForecastProjection,
      TargetSubjectIdsFieldName: "ForecastIds",
      TargetType: PlannedDepositProjection,
      TriggeringSubjectIdFieldName: "ForecastId",
    });
    super(declaration);
  }
  public Handle(event: ForecastCreatedEvent): void {
    super.Handle(event);
  }
}
