import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../source/Core/ProjectionStore";
import { Subscriptions } from "../../../../source/Core/Subscriptions";
import { PlannedExpenseRequestedEvent } from "../../../../source/Events/PlannedExpenseRequestedEvent";
import { PlannedExpenseProjection } from "../../../../source/Projections/PlannedExpenseProjection";
import { CreatePlannedExpenseService } from "../../../../source/Services/Creates/CreatePlannedExpenseService";


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
