import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../source/Core/ProjectionStore";
import { Subscriptions } from "../../../../source/Core/Subscriptions";
import { AllocationRequestedEvent } from "../../../../source/Events/AllocationRequestedEvent";
import { AllocationProjection } from "../../../../source/Projections/AllocationProjection";
import { CreateAllocationService } from "../../../../source/Services/Creates/CreateAllocationService";


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
