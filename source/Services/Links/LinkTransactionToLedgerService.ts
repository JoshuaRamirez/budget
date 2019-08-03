import { LinkManyToOneService } from "../../Core/LinkManyToOneService";
import { TransactionCreatedEvent } from "../../Events/TransactionCreatedEvent";
import { LedgerProjection } from "../../Projections/LedgerProjection";
import { TransactionProjection } from "../../Projections/TransactionProjection";

export class LinkTransactionToLedgerService extends LinkManyToOneService<TransactionCreatedEvent> {
  public static Instance: LinkTransactionToLedgerService = new LinkTransactionToLedgerService();
  private constructor() {
    super(
      TransactionCreatedEvent,
      TransactionProjection,
      "TransactionId",
      "TransactionIds",
      LedgerProjection,
      "LedgerId",
    );
  }
}
