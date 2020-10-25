import { assert } from "chai";
import "mocha";
import { AllocationRequestedEvent } from "../../../../Source/Events/Requested/Creation/AllocationRequestedEvent";
import { AllocationProjection } from "../../../../Source/Projections/AllocationProjection";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { CreateAllocationService } from "../../../../Source/Services/Creates/CreateAllocationService";
import { System } from "../../../../Source/System/System";

describe("CreateAllocationService", () => {
  beforeEach(async () => {
    await System.Shutdown();
    await System.Startup();
  });
  it("should create projection", async () => {
    const event = new AllocationRequestedEvent();
    await event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = await projectionStore.GetProjections(AllocationProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
