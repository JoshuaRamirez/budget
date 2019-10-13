import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { LedgerProjection } from "../../../../Source/Projections/LedgerProjection";
import { Subscriptions } from "../../../../Source/Services/Core/Subscriptions";
import { CreateLedgerService } from "../../../../Source/Services/Creates/CreateLedgerService";
import { NewLedgerRequestedEvent } from "../../../Helpers";


describe("CreateLedgerService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  it("should create projection", () => {
    const event = NewLedgerRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(LedgerProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
