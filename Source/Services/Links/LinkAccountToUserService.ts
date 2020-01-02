import { AccountCreatedEvent } from "../../Events/AccountCreatedEvent";
import { AccountProjection } from "../../Projections/AccountProjection";
import { UserProjection } from "../../Projections/UserProjection";
import { LinkManyToOneDeclaration } from "./Core/LinkManyToOneDeclaration";
import { LinkService } from "./Core/LinkService";

export class LinkAccountToUserService
extends LinkService<AccountCreatedEvent, AccountProjection, UserProjection> {
  public static Instance: LinkAccountToUserService = new LinkAccountToUserService();
  private constructor() {
    const declaration = new
    LinkManyToOneDeclaration<AccountCreatedEvent, AccountProjection, UserProjection>
    ({
      EventType: AccountCreatedEvent,
      SubjectIdFieldName: "AccountId",
      SubjectTargetIdFieldName: "UserId",
      SubjectType: AccountProjection,
      TargetSubjectIdsFieldName: "AccountIds",
      TargetType: UserProjection,
    });
    super(declaration);
  }
  public Handle(event: AccountCreatedEvent): void {
    super.Handle(event);
  }
}
