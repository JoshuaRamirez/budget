import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { TransactionProjection } from "../../../../Source/Projections/TransactionProjection";
import { CreateTransactionService } from "../../../../Source/Services/Creates/CreateTransactionService";
import { System } from "../../../../Source/System/System";
import { NewTransactionRequestedEvent } from "../../../Helpers";

describe("CreateTransactionService", () => {
  beforeEach(async () => {
    await System.Shutdown();
    await System.Startup();
  });
  it("should create projection", async () => {
    const event = await NewTransactionRequestedEvent();
    await event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = await projectionStore.GetProjections(TransactionProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
