import { assert } from "chai";
import "mocha";
import { DepositRequestedEvent } from "../../../../Source/Events/Requested/Creation/DepositRequestedEvent";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { DepositProjection } from "../../../../Source/Projections/DepositProjection";
import { CreateDepositService } from "../../../../Source/Services/Creates/CreateDepositService";
import { System } from "../../../../Source/System/System";

describe("CreateDepositService", () => {
  beforeEach(() => {
    System.Shutdown();
    System.Startup();
  });
  it("should create projection", () => {
    const event = new DepositRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(DepositProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
