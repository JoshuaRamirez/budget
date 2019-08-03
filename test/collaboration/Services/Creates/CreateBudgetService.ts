import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../source/Core/ProjectionStore";
import { Subscriptions } from "../../../../source/Core/Subscriptions";
import { BudgetRequestedEvent } from "../../../../source/Events/BudgetRequestedEvent";
import { BudgetProjection } from "../../../../source/Projections/BudgetProjection";
import { CreateBudgetService } from "../../../../source/Services/Creates/CreateBudgetService";


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
