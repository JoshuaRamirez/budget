import { assert } from "chai";
import "mocha";
import { BudgetRequestedEvent } from "../../../../Source/Events/Requested/Creation/BudgetRequestedEvent";
import { BudgetProjection } from "../../../../Source/Projections/BudgetProjection";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { CreateBudgetService } from "../../../../Source/Services/Creates/CreateBudgetService";
import { System } from "../../../../Source/System/System";

describe("CreateBudgetService", () => {
  beforeEach(async () => {
    await System.Shutdown();
    await System.Startup();
  });
  it("should create projection", async () => {
    const event = new BudgetRequestedEvent();
    await event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = await projectionStore.GetProjections(BudgetProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
