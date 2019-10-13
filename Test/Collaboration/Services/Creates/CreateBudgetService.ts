import { assert } from "chai";
import "mocha";
import { BudgetRequestedEvent } from "../../../../Source/Events/BudgetRequestedEvent";
import { BudgetProjection } from "../../../../Source/Projections/BudgetProjection";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { Subscriptions } from "../../../../Source/Services/Core/Subscriptions";
import { CreateBudgetService } from "../../../../Source/Services/Creates/CreateBudgetService";


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
