import { LedgerCreatedEvent } from "../../Events/LedgerCreatedEvent";
import { AccountProjection } from "../../Projections/AccountProjection";
import { LedgerProjection } from "../../Projections/LedgerProjection";
import { LinkOneToOneDeclaration } from "./Core/LinkOneToOneDeclaration";
import { LinkService } from "./Core/LinkService";

export class LinkLedgerToAccountService extends LinkService<LedgerCreatedEvent> {
  public static Instance: LinkLedgerToAccountService = new LinkLedgerToAccountService();
  private constructor() {
    const declaration = new LinkOneToOneDeclaration({
      EventType: LedgerCreatedEvent,
      SubjectIdFieldName: "LedgerId",
      SubjectType: LedgerProjection,
      TargetIdFieldName: "AccountId",
      TargetSubjectIdFieldName: "LedgerId",
      TargetType: AccountProjection,
    });
    super(declaration);
  }
  public Handle(event: LedgerCreatedEvent): void {
    super.Handle(event);
  }
}
