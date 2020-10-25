import { assert } from "chai";
import "mocha";
import { UserRequestedEvent } from "../../../../Source/Events/Requested/Creation/UserRequestedEvent";
import { AccountProjection } from "../../../../Source/Projections/AccountProjection";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { CreateAccountService } from "../../../../Source/Services/Creates/CreateAccountService";
import { System } from "../../../../Source/System/System";
import { NewAccountRequestedEvent } from "../../../Helpers";

describe("CreateAccountService", () => {
  beforeEach(async () => {
    await System.Shutdown();
    await System.Startup();
    // Each Account created is expected to be linked to a User
    const userRequestedEvent = new UserRequestedEvent();
    await userRequestedEvent.Publish();
  });
  it("should create projection", async () => {
    const newAccountRequestedEvent = await NewAccountRequestedEvent();
    await newAccountRequestedEvent.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = await projectionStore.GetProjections(AccountProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
