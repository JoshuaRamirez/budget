import { LinkManyToOneService } from "../../Core/LinkManyToOneService";
import { TransactionCreatedEvent } from "../../Events/TransactionCreatedEvent";
import { LedgerProjection } from "../../Projections/LedgerProjection";
import { TransactionProjection } from "../../Projections/TransactionProjection";

export class LinkTransactionToLedgerService extends LinkManyToOneService<TransactionCreatedEvent> {
  public static Instance: LinkTransactionToLedgerService = new LinkTransactionToLedgerService();
  private constructor() {
    super(
      {
        EventType: TransactionCreatedEvent,
        SubjectAggregationFieldName: "TransactionIds",
        SubjectIdFieldName: "TransactionId",
        SubjectType: TransactionProjection,
        TargetIdFieldName: "LedgerId",
        TargetType: LedgerProjection,
      },
    );
  }
}
