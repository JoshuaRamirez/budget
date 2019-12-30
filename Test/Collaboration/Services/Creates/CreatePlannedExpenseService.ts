import { assert } from "chai";
import "mocha";
import { PlannedExpenseRequestedEvent } from "../../../../Source/Events/PlannedExpenseRequestedEvent";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { PlannedExpenseProjection } from "../../../../Source/Projections/PlannedExpenseProjection";
import { CreatePlannedExpenseService } from "../../../../Source/Services/Creates/CreatePlannedExpenseService";
import { Subscriptions } from "../../../../Source/Subscriptions";


describe("CreatePlannedExpenseService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  it("should create projection", () => {
    const event = new PlannedExpenseRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(PlannedExpenseProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
