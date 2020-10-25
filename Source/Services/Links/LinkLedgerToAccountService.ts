import { LedgerCreatedEvent } from "../../Events/Created/LedgerCreatedEvent";
import { AccountProjection } from "../../Projections/AccountProjection";
import { LedgerProjection } from "../../Projections/LedgerProjection";
import { LinkOneSubjectToOneTargetDeclaration } from "./Core/LinkOneSubjectToOneTargetDeclaration";
import { LinkService } from "./Core/LinkService";

export class LinkLedgerToAccountService extends LinkService<LedgerCreatedEvent, LedgerProjection, AccountProjection> {
  public static Instance: LinkLedgerToAccountService = new LinkLedgerToAccountService();
  private constructor() {
    const declaration = new LinkOneSubjectToOneTargetDeclaration<LedgerCreatedEvent, LedgerProjection, AccountProjection>({
      EventType: LedgerCreatedEvent,
      SubjectIdFieldName: "LedgerId",
      SubjectTargetIdFieldName: "AccountId",
      SubjectType: LedgerProjection,
      TargetSubjectIdFieldName: "LedgerId",
      TargetType: AccountProjection
    });
    super(declaration);
  }
  public async Receive(event: LedgerCreatedEvent): Promise<void> {
    await super.Receive(event);
    return new Promise((resolve, reject) => resolve());
  }
}
