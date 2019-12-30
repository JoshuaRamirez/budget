import { assert } from "chai";
import "mocha";
import { TransactionCreatedEvent } from "../../../../Source/Events/TransactionCreatedEvent";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { LedgerProjection } from "../../../../Source/Projections/LedgerProjection";
import { TransactionProjection } from "../../../../Source/Projections/TransactionProjection";
import { UpdateLedgerBalanceService } from "../../../../Source/Services/Updates/UpdateLedgerBalanceService";
import { Subscriptions } from "../../../../Source/Subscriptions";


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
    transactionCreatedEvent.LedgerId = transactionProjection.LedgerId;
    transactionCreatedEvent.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections<LedgerProjection>(LedgerProjection);
    const projection = projections[0];
    assert.equal(projection.Balance, 1);
  });
});
