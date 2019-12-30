import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { PlannedTransactionProjection } from "../../../../Source/Projections/PlannedTransactionProjection";
import { Subscriptions } from "../../../../Source/Subscriptions";
import { NewPlannedTransactionCreationRequestedEvent } from "../../../Helpers";


describe("CreatePlannedTransactionService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  it("should create projection", () => {
    const event = NewPlannedTransactionCreationRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(PlannedTransactionProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
