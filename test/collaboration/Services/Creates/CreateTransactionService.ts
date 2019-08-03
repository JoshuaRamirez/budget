import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../source/Core/ProjectionStore";
import { Subscriptions } from "../../../../source/Core/Subscriptions";
import { TransactionRequestedEvent } from "../../../../source/Events/TransactionRequestedEvent";
import { TransactionProjection } from "../../../../source/Projections/TransactionProjection";
import { CreateTransactionService } from "../../../../source/Services/Creates/CreateTransactionService";


describe("CreateTransactionService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  it("should create projection", () => {
    const event = new TransactionRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(TransactionProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
