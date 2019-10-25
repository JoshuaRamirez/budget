import { assert } from "chai";
import "mocha";
import { AllocationRequestedEvent } from "../../../../Source/Events/AllocationRequestedEvent";
import { AllocationProjection } from "../../../../Source/Projections/AllocationProjection";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { Subscriptions } from "../../../../Source/Services/Core/Subscriptions";
import { CreateAllocationService } from "../../../../Source/Services/Creates/CreateAllocationService";


describe("CreateAllocationService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
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