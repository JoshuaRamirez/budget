import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../source/Core/ProjectionStore";
import { Subscriptions } from "../../../../source/Core/Subscriptions";
import { TransactionCreatedEvent } from "../../../../source/Events/TransactionCreatedEvent";
import { LedgerProjection } from "../../../../source/Projections/LedgerProjection";
import { TransactionProjection } from "../../../../source/Projections/TransactionProjection";
import { UpdateLedgerBalanceService } from "../../../../source/Services/Updates/UpdateLedgerBalanceService";


describe("UpdateLedgerBalanceService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  it("should update projection with allocation", () => {
    const ledgerProjection = new LedgerProjection();
    ledgerProjection.Project();
    const transactionProjection = new TransactionProjection();
    transactionProjection.Amount = -1;
    transactionProjection.LedgerId = ledgerProjection.Id;
    transactionProjection.Project();
    const transactionCreatedEvent = new TransactionCreatedEvent();
    transactionCreatedEvent.TransactionId = transactionProjection.Id;
    transactionCreatedEvent.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(LedgerProjection);
    const projection = projections[0];
    assert.equal(projection.Balance, 1);
  });
});
