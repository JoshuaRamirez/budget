import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { ProposedTransactionProjection } from "../../../../Source/Projections/ProposedTransactionProjection";
import { System } from "../../../../Source/System/System";
import { NewProposedTransactionCreationRequestedEvent } from "../../../Helpers";


describe("CreateProposedTransactionService", () => {
  beforeEach(() => {
    System.Shutdown();
    System.Startup();
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
