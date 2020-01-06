import { assert } from "chai";
import "mocha";
import { AccountProjection } from "../../../../Source/Projections/AccountProjection";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { UserProjection } from "../../../../Source/Projections/UserProjection";
import { LinkAccountToUserService } from "../../../../Source/Services/Links/LinkAccountToUserService";
import { Subscriptions } from "../../../../Source/Subscriptions";
import { NewAccountCreatedEvent } from "../../../Helpers";

describe("LinkAccountToUserService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  it("should add the account id to the user link list", () => {
    const accountCreatedEvent = NewAccountCreatedEvent();
    accountCreatedEvent.Publish();
    const accountProjection = AccountProjection.Get(accountCreatedEvent.AccountId);
    const userProjection = UserProjection.Get(accountProjection.UserId);
    assert.equal(userProjection.AccountIds[0], accountCreatedEvent.AccountId);
  });
});
