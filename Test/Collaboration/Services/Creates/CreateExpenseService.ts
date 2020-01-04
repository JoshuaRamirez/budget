import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { ExpenseProjection } from "../../../../Source/Projections/ExpenseProjection";
import { CreateExpenseService } from "../../../../Source/Services/Creates/CreateExpenseService";
import { System } from "../../../../Source/System/System";
import { NewExpenseRequestedEvent } from "../../../Helpers";


describe("CreateExpenseService", () => {
  beforeEach(() => {
    System.Shutdown();
    System.Startup();
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
