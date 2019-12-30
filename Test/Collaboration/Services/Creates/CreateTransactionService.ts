import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { TransactionProjection } from "../../../../Source/Projections/TransactionProjection";
import { CreateTransactionService } from "../../../../Source/Services/Creates/CreateTransactionService";
import { Subscriptions } from "../../../../Source/Subscriptions";
import { NewTransactionRequestedEvent } from "../../../Helpers";


describe("CreateTransactionService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
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
