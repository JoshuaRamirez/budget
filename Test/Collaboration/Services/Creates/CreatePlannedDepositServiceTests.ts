import { assert } from "chai";
import "mocha";
import { PlannedDepositRequestedEvent } from "../../../../Source/Events/Requested/Creation/PlannedDepositRequestedEvent";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { PlannedDepositProjection } from "../../../../Source/Projections/PlannedDepositProjection";
import { CreatePlannedDepositService } from "../../../../Source/Services/Creates/CreatePlannedDepositService";
import { System } from "../../../../Source/System/System";

describe("CreatePlannedDepositService", () => {
  beforeEach(() => {
    System.Shutdown();
    System.Startup();
  });
  it("should create projection", () => {
    const event = new PlannedDepositRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(PlannedDepositProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
