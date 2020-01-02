import { TransactionCreatedEvent } from "../../Events/TransactionCreatedEvent";
import { LedgerProjection } from "../../Projections/LedgerProjection";
import { TransactionProjection } from "../../Projections/TransactionProjection";
import { LinkManySubjectsToOneTargetDeclaration } from "./Core/LinkManySubjectsToOneTargetDeclaration";
import { LinkService } from "./Core/LinkService";

export class LinkTransactionToLedgerService extends LinkService<TransactionCreatedEvent, TransactionProjection, LedgerProjection> {
  public static Instance: LinkTransactionToLedgerService = new LinkTransactionToLedgerService();
  private constructor() {
    const declaration = new
    LinkManySubjectsToOneTargetDeclaration<TransactionCreatedEvent, TransactionProjection, LedgerProjection>
    ({
      EventType: TransactionCreatedEvent,
      SubjectIdFieldName: "TransactionId",
      SubjectTargetIdFieldName: "LedgerId",
      SubjectType: TransactionProjection,
      TargetSubjectIdsFieldName: "TransactionIds",
      TargetType: LedgerProjection,
    });
    super(declaration);
  }
  public Handle(event: TransactionCreatedEvent): void {
    super.Handle(event);
  }
}
