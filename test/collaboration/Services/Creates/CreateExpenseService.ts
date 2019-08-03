import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../source/Core/ProjectionStore";
import { Subscriptions } from "../../../../source/Core/Subscriptions";
import { ExpenseRequestedEvent } from "../../../../source/Events/ExpenseRequestedEvent";
import { ExpenseProjection } from "../../../../source/Projections/ExpenseProjection";
import { CreateExpenseService } from "../../../../source/Services/Creates/CreateExpenseService";


describe("CreateExpenseService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  it("should create projection", () => {
    const event = new ExpenseRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(ExpenseProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
