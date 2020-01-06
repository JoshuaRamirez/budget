import { assert } from "chai";
import "mocha";
import { PayeeRequestedEvent } from "../../../../Source/Events/Requested/Creation/PayeeRequestedEvent";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { PayeeProjection } from "../../../../Source/Projections/PayeeProjection";
import { CreatePayeeService } from "../../../../Source/Services/Creates/CreatePayeeService";
import { System } from "../../../../Source/System/System";

describe("CreatePayeeService", () => {
  beforeEach(() => {
    System.Shutdown();
    System.Startup();
  });
  it("should create projection", () => {
    const event = new PayeeRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(PayeeProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
