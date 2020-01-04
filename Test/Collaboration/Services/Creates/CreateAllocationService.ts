import { assert } from "chai";
import "mocha";
import { AllocationRequestedEvent } from "../../../../Source/Events/Requested/Creation/AllocationRequestedEvent";
import { AllocationProjection } from "../../../../Source/Projections/AllocationProjection";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { CreateAllocationService } from "../../../../Source/Services/Creates/CreateAllocationService";
import { System } from "../../../../Source/System/System";


describe("CreateAllocationService", () => {
  beforeEach(() => {
    System.Shutdown();
    System.Startup();
  });
  it("should create projection", () => {
    const event = new AllocationRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(AllocationProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
