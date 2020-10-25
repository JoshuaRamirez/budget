import { assert } from "chai";
import "mocha";
import { AccountProjection } from "../../../../Source/Projections/AccountProjection";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { UserProjection } from "../../../../Source/Projections/UserProjection";
import { LinkAccountToUserService } from "../../../../Source/Services/Links/LinkAccountToUserService";
import { Subscriptions } from "../../../../Source/Subscriptions";
import { NewAccountCreatedEvent } from "../../../Helpers";

describe("LinkAccountToUserService", () => {
  beforeEach(async () => {
    await Subscriptions.Release();
    await Subscriptions.Create();
    await ProjectionStore.Instance.ClearAll();
  });
  it("should add the account id to the user link list", async () => {
    const accountCreatedEvent = await NewAccountCreatedEvent();
    await accountCreatedEvent.Publish();
    const accountProjection = await AccountProjection.Get(accountCreatedEvent.AccountId);
    const userProjection = await UserProjection.Get(accountProjection.UserId);
    assert.equal(userProjection.AccountIds[0], accountCreatedEvent.AccountId);
  });
});
