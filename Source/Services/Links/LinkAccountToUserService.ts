import { AccountCreatedEvent } from "../../Events/AccountCreatedEvent";
import { AccountProjection } from "../../Projections/AccountProjection";
import { UserProjection } from "../../Projections/UserProjection";
import { LinkManyToOneDeclaration } from "./Core/LinkManyToOneDeclaration";
import { LinkService } from "./Core/LinkService";

export class LinkAccountToUserService extends LinkService<AccountCreatedEvent> {
  public static Instance: LinkAccountToUserService = new LinkAccountToUserService();
  private constructor() {
    const declaration = new LinkManyToOneDeclaration({
      EventType: AccountCreatedEvent,
      SubjectType: AccountProjection,
      TargetIdFieldName: "UserId",
      TargetSubjectIdsFieldName: "AccountIds",
      TargetType: UserProjection,
      SubjectIdFieldName: "AccountId",
    });
    super(declaration);
  }
  public Handle(event: AccountCreatedEvent): void {
    super.Handle(event);
  }
}
