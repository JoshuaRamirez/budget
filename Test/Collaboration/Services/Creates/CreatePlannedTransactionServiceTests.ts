import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { PlannedTransactionProjection } from "../../../../Source/Projections/PlannedTransactionProjection";
import { System } from "../../../../Source/System/System";
import { NewPlannedTransactionCreationRequestedEvent } from "../../../Helpers";

describe("CreatePlannedTransactionService", () => {
  beforeEach(async () => {
    await System.Shutdown();
    await System.Startup();
  });
  it("should create projection", async () => {
    const event = await NewPlannedTransactionCreationRequestedEvent();
    await event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = await projectionStore.GetProjections(PlannedTransactionProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
