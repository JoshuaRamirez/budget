import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { ProposedTransactionProjection } from "../../../../Source/Projections/ProposedTransactionProjection";
import { Subscriptions } from "../../../../Source/Subscriptions";
import { NewProposedTransactionCreationRequestedEvent } from "../../../Helpers";


describe("CreateProposedTransactionService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  it("should create projection", () => {
    const event = NewProposedTransactionCreationRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(ProposedTransactionProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
