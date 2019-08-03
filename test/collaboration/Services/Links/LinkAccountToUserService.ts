import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../source/Core/ProjectionStore";
import { Subscriptions } from "../../../../source/Core/Subscriptions";
import { AccountCreatedEvent } from "../../../../source/Events/AccountCreatedEvent";
import { AccountProjection } from "../../../../source/Projections/AccountProjection";
import { UserProjection } from "../../../../source/Projections/UserProjection";
import { LinkAccountToUserService } from "../../../../source/Services/Links/LinkAccountToUserService";


describe("LinkAccountToUserService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  it("should add the account id to the user link list", () => {
    let userProjection = new UserProjection();
    userProjection.Project();
    const accountProjection = new AccountProjection();
    accountProjection.UserId = userProjection.Id;
    accountProjection.Project();
    const accountCreatedEvent = new AccountCreatedEvent();
    accountCreatedEvent.AccountId = accountProjection.Id;
    accountCreatedEvent.Publish();
    const projectionStore = ProjectionStore.Instance;
    const userProjections = projectionStore.GetProjections(UserProjection);
    userProjection = userProjections[0];
    assert.equal(userProjection.AccountIds[0], accountProjection.Id);
  });
});
