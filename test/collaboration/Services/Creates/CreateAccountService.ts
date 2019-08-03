import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../source/Core/ProjectionStore";
import { Subscriptions } from "../../../../source/Core/Subscriptions";
import { AccountRequestedEvent } from "../../../../source/Events/AccountRequestedEvent";
import { AccountProjection } from "../../../../source/Projections/AccountProjection";
import { CreateAccountService } from "../../../../source/Services/Creates/CreateAccountService";


describe("CreateAccountService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  it("should create projection", () => {
    const event = new AccountRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(AccountProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
