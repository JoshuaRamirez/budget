import { assert } from "chai";
import "mocha";
import { PayerRequestedEvent } from "../../../../Source/Events/Requested/Creation/PayerRequestedEvent";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { PayerProjection } from "../../../../Source/Projections/PayerProjection";
import { CreatePayerService } from "../../../../Source/Services/Creates/CreatePayerService";
import { System } from "../../../../Source/System/System";

describe("CreatePayerService", () => {
  beforeEach(() => {
    System.Shutdown();
    System.Startup();
  });
  it("should create projection", () => {
    const event = new PayerRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(PayerProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
