import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { ExpenseProjection } from "../../../../Source/Projections/ExpenseProjection";
import { Subscriptions } from "../../../../Source/Services/Core/Subscriptions";
import { CreateExpenseService } from "../../../../Source/Services/Creates/CreateExpenseService";
import { NewExpenseRequestedEvent } from "../../../Helpers";


describe("CreateExpenseService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  it("should create projection", () => {
    const event = NewExpenseRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(ExpenseProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
