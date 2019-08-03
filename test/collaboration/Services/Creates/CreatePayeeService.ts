import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../source/Core/ProjectionStore";
import { Subscriptions } from "../../../../source/Core/Subscriptions";
import { PayeeRequestedEvent } from "../../../../source/Events/PayeeRequestedEvent";
import { PayeeProjection } from "../../../../source/Projections/PayeeProjection";
import { CreatePayeeService } from "../../../../source/Services/Creates/CreatePayeeService";


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
