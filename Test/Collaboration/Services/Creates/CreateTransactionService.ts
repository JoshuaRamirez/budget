import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { TransactionProjection } from "../../../../Source/Projections/TransactionProjection";
import { CreateTransactionService } from "../../../../Source/Services/Creates/CreateTransactionService";
import { System } from "../../../../Source/System/System";
import { NewTransactionRequestedEvent } from "../../../Helpers";

describe("CreateTransactionService", () => {
  beforeEach(() => {
    System.Shutdown();
    System.Startup();
  });
  it("should create projection", () => {
    const event = NewTransactionRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(TransactionProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
