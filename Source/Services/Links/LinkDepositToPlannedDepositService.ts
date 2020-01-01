import { DepositCreatedEvent } from "../../Events/DepositCreatedEvent";
import { DepositProjection } from "../../Projections/DepositProjection";
import { PlannedDepositProjection } from "../../Projections/PlannedDepositProjection";
import { LinkManyToOneDeclaration } from "./Core/LinkManyToOneDeclaration";
import { LinkService } from "./Core/LinkService";

export class LinkDepositToPlannedDepositService extends LinkService<DepositCreatedEvent> {
  public static Instance = new LinkDepositToPlannedDepositService();
  private constructor() {
    const declaration = new LinkManyToOneDeclaration({
      EventType: DepositCreatedEvent,
      SubjectIdFieldName: "DepositId",
      SubjectType: DepositProjection,
      TargetIdFieldName: "PlannedDepositId",
      TargetSubjectIdsFieldName: "DepositIds",
      TargetType: PlannedDepositProjection,
    });
    super(declaration);
  }
  public Handle(event: DepositCreatedEvent): void {
    super.Handle(event);
  }
}
