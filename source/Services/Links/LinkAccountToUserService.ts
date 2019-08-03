import { LinkManyToOneService } from "../../Core/LinkManyToOneService";
import { AccountCreatedEvent } from "../../Events/AccountCreatedEvent";
import { AccountProjection } from "../../Projections/AccountProjection";
import { UserProjection } from "../../Projections/UserProjection";

export class LinkAccountToUserService extends LinkManyToOneService<AccountCreatedEvent> {
  public static Instance: LinkAccountToUserService = new LinkAccountToUserService();
  private constructor() {
    super(
      AccountCreatedEvent,
      AccountProjection,
      "AccountId",
      "AccountIds",
      UserProjection,
      "UserId",
    );
  }
}
