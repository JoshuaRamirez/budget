import { assert } from "chai";
import "mocha";
import { BudgetRequestedEvent } from "../../../../Source/Events/Requested/Creation/BudgetRequestedEvent";
import { BudgetProjection } from "../../../../Source/Projections/BudgetProjection";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { CreateBudgetService } from "../../../../Source/Services/Creates/CreateBudgetService";
import { Subscriptions } from "../../../../Source/Subscriptions";


describe("CreateBudgetService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  it("should create projection", () => {
    const event = new BudgetRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(BudgetProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
