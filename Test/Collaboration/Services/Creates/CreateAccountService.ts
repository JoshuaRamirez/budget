import { assert } from "chai";
import "mocha";
import { UserRequestedEvent } from "../../../../Source/Events/UserRequestedEvent";
import { AccountProjection } from "../../../../Source/Projections/AccountProjection";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { CreateAccountService } from "../../../../Source/Services/Creates/CreateAccountService";
import { Subscriptions } from "../../../../Source/Subscriptions";
import { NewAccountRequestedEvent } from "../../../Helpers";


describe("CreateAccountService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
    // Each Account created is expected to be linked to a User
    const userRequestedEvent = new UserRequestedEvent();
    userRequestedEvent.Publish();
  });
  it("should create projection", () => {
    const event = NewAccountRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(AccountProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
