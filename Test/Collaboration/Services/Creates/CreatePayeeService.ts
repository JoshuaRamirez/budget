import { assert } from "chai";
import "mocha";
import { PayeeRequestedEvent } from "../../../../Source/Events/PayeeRequestedEvent";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { PayeeProjection } from "../../../../Source/Projections/PayeeProjection";
import { Subscriptions } from "../../../../Source/Services/Core/Subscriptions";
import { CreatePayeeService } from "../../../../Source/Services/Creates/CreatePayeeService";


describe("CreatePayeeService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
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
