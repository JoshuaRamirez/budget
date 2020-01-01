import { TransactionCreatedEvent } from "../../Events/TransactionCreatedEvent";
import { LedgerProjection } from "../../Projections/LedgerProjection";
import { TransactionProjection } from "../../Projections/TransactionProjection";
import { LinkManyToOneDeclaration } from "./Core/LinkManyToOneDeclaration";
import { LinkService } from "./Core/LinkService";

export class LinkTransactionToLedgerService extends LinkService<TransactionCreatedEvent> {
  public static Instance: LinkTransactionToLedgerService = new LinkTransactionToLedgerService();
  private constructor() {
    const declaration = new LinkManyToOneDeclaration({
      EventType: TransactionCreatedEvent,
      SubjectType: TransactionProjection,
      TargetIdFieldName: "LedgerId",
      TargetSubjectIdsFieldName: "TransactionIds",
      TargetType: LedgerProjection,
      SubjectIdFieldName: "TransactionId",
    });
    super(declaration);
  }
  public Handle(event: TransactionCreatedEvent): void {
    super.Handle(event);
  }
}
