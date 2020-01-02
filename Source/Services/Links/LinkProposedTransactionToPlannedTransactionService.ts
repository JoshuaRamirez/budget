import { ProposedTransactionCreatedEvent } from "../../Events/Created/ProposedTransactionCreatedEvent";
import { PlannedTransactionProjection } from "../../Projections/PlannedTransactionProjection";
import { ProposedTransactionProjection } from "../../Projections/ProposedTransactionProjection";
import { LinkManySubjectsToOneTargetDeclaration } from "./Core/LinkManySubjectsToOneTargetDeclaration";
import { LinkService } from "./Core/LinkService";

export class LinkProposedTransactionToPlannedTransactionService
extends LinkService<ProposedTransactionCreatedEvent, ProposedTransactionProjection, PlannedTransactionProjection> {
  public static Instance = new LinkProposedTransactionToPlannedTransactionService();
  private constructor() {
    const declaration = new
    LinkManySubjectsToOneTargetDeclaration<ProposedTransactionCreatedEvent, ProposedTransactionProjection, PlannedTransactionProjection>
    ({
      EventType: ProposedTransactionCreatedEvent,
      SubjectIdFieldName: "ProposedTransactionId",
      SubjectTargetIdFieldName: "PlannedTransactionId",
      SubjectType: ProposedTransactionProjection,
      TargetSubjectIdsFieldName: "ProposedTransactionIds",
      TargetType: PlannedTransactionProjection,
    });
    super(declaration);
  }
  public Receive(event: ProposedTransactionCreatedEvent): void {
    super.Receive(event);
  }
}
