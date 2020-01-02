import { DepositCreatedEvent } from "../../Events/DepositCreatedEvent";
import { DepositProjection } from "../../Projections/DepositProjection";
import { PlannedDepositProjection } from "../../Projections/PlannedDepositProjection";
import { LinkManyToOneDeclaration } from "./Core/LinkManyToOneDeclaration";
import { LinkService } from "./Core/LinkService";

export class LinkDepositToPlannedDepositService
extends LinkService<DepositCreatedEvent, DepositProjection, PlannedDepositProjection> {
  public static Instance = new LinkDepositToPlannedDepositService();
  private constructor() {
    const declaration = new
    LinkManyToOneDeclaration<DepositCreatedEvent, DepositProjection, PlannedDepositProjection>
    ({
      EventType: DepositCreatedEvent,
      SubjectIdFieldName: "DepositId",
      SubjectTargetIdFieldName: "PlannedDepositId",
      SubjectType: DepositProjection,
      TargetSubjectIdsFieldName: "DepositIds",
      TargetType: PlannedDepositProjection,
    });
    super(declaration);
  }
  public Handle(event: DepositCreatedEvent): void {
    super.Handle(event);
  }
}
