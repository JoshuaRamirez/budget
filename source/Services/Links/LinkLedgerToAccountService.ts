import { LinkOneToOneService } from "../../Core/LinkOneToOneService";
import { LedgerCreatedEvent } from "../../Events/LedgerCreatedEvent";
import { AccountProjection } from "../../Projections/AccountProjection";
import { LedgerProjection } from "../../Projections/LedgerProjection";

export class LinkLedgerToAccountService extends LinkOneToOneService<LedgerCreatedEvent> {
  public static Instance: LinkLedgerToAccountService = new LinkLedgerToAccountService();
  private constructor() {
    super(
      LedgerCreatedEvent,
      LedgerProjection,
      "LedgerId",
      AccountProjection,
      "AccountId",
    );
  }
}
