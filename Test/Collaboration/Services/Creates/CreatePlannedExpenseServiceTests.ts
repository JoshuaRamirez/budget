import { assert } from "chai";
import "mocha";
import { PlannedExpenseRequestedEvent } from "../../../../Source/Events/Requested/Creation/PlannedExpenseRequestedEvent";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { PlannedExpenseProjection } from "../../../../Source/Projections/PlannedExpenseProjection";
import { CreatePlannedExpenseService } from "../../../../Source/Services/Creates/CreatePlannedExpenseService";
import { System } from "../../../../Source/System/System";

describe("CreatePlannedExpenseService", () => {
  beforeEach(async () => {
    await System.Shutdown();
    await System.Startup();
  });
  it("should create projection", async () => {
    const event = new PlannedExpenseRequestedEvent();
    await event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = await projectionStore.GetProjections(PlannedExpenseProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
