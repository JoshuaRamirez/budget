import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../source/Core/ProjectionStore";
import { Subscriptions } from "../../../../source/Core/Subscriptions";
import { LedgerRequestedEvent } from "../../../../source/Events/LedgerRequestedEvent";
import { LedgerProjection } from "../../../../source/Projections/LedgerProjection";
import { CreateLedgerService } from "../../../../source/Services/Creates/CreateLedgerService";


describe("CreateLedgerService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  it("should create projection", () => {
    const event = new LedgerRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(LedgerProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
