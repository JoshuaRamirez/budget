import { ProposedTransactionCreatedEvent } from "../../Events/ProposedTransactionCreatedEvent";
import { PlannedTransactionProjection } from "../../Projections/PlannedTransactionProjection";
import { ProposedTransactionProjection } from "../../Projections/ProposedTransactionProjection";
import { LinkManyToOneDeclaration } from "./Core/LinkManyToOneDeclaration";
import { LinkService } from "./Core/LinkService";

export class LinkProposedTransactionToPlannedTransactionService extends LinkService<ProposedTransactionCreatedEvent> {
  public static Instance = new LinkProposedTransactionToPlannedTransactionService();
  private constructor() {
    const declaration = new LinkManyToOneDeclaration({
      EventType: ProposedTransactionCreatedEvent,
      SubjectType: ProposedTransactionProjection,
      TargetIdFieldName: "PlannedTransactionId",
      TargetSubjectIdsFieldName: "ProposedTransactionIds",
      TargetType: PlannedTransactionProjection,
      SubjectIdFieldName: "ProposedTransactionId",
    });
    super(declaration);
  }
  public Handle(event: ProposedTransactionCreatedEvent): void {
    super.Handle(event);
  }
}
