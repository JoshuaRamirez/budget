import { assert } from "chai";
import "mocha";
import { TransactionCreatedEvent } from "../../../../Source/Events/Created/TransactionCreatedEvent";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { LedgerProjection } from "../../../../Source/Projections/LedgerProjection";
import { TransactionProjection } from "../../../../Source/Projections/TransactionProjection";
import { UpdateLedgerBalanceService } from "../../../../Source/Services/Domain/UpdateLedgerBalanceService";
import { Subscriptions } from "../../../../Source/Subscriptions";

describe("UpdateLedgerBalanceService", async () => {
  beforeEach(async () => {
    Subscriptions.Release();
    Subscriptions.Create();
    await ProjectionStore.Instance.ClearAll();
  });
  it("should update projection with allocation", async () => {
    const ledgerProjection = new LedgerProjection();
    await ledgerProjection.Project();
    const transactionProjection = new TransactionProjection();
    transactionProjection.Amount = -1;
    transactionProjection.LedgerId = ledgerProjection.Id;
    await transactionProjection.Project();
    const transactionCreatedEvent = new TransactionCreatedEvent();
    transactionCreatedEvent.TransactionId = transactionProjection.Id;
    await transactionCreatedEvent.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = await projectionStore.GetProjections<LedgerProjection>(LedgerProjection);
    const projection = projections[0];
    assert.equal(projection.Balance, 1);
  });
});
