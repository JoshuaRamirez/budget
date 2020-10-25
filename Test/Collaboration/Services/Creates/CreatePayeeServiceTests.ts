import { assert } from "chai";
import "mocha";
import { PayeeRequestedEvent } from "../../../../Source/Events/Requested/Creation/PayeeRequestedEvent";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { PayeeProjection } from "../../../../Source/Projections/PayeeProjection";
import { CreatePayeeService } from "../../../../Source/Services/Creates/CreatePayeeService";
import { System } from "../../../../Source/System/System";

describe("CreatePayeeService", () => {
  beforeEach(async () => {
    await System.Shutdown();
    await System.Startup();
  });
  it("should create projection", async () => {
    const event = new PayeeRequestedEvent();
    await event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = await projectionStore.GetProjections(PayeeProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
