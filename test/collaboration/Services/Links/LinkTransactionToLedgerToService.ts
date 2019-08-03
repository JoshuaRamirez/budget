import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../source/Core/ProjectionStore";
import { Subscriptions } from "../../../../source/Core/Subscriptions";
import { TransactionCreatedEvent } from "../../../../source/Events/TransactionCreatedEvent";
import { LedgerProjection } from "../../../../source/Projections/LedgerProjection";
import { TransactionProjection } from "../../../../source/Projections/TransactionProjection";
import { LinkTransactionToLedgerService } from "../../../../source/Services/Links/LinkTransactionToLedgerService";


describe("LinkTransactionToLedgerService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  it("should link transaction to ledger", () => {
    const newLedgerProjection = new LedgerProjection();
    newLedgerProjection.Project();
    const transactionProjection = new TransactionProjection();
    transactionProjection.LedgerId = newLedgerProjection.Id;
    transactionProjection.Project();
    const event = new TransactionCreatedEvent();
    event.TransactionId = transactionProjection.Id;
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const ledgerProjections = projectionStore.GetProjections(LedgerProjection);
    const ledgerProjection = ledgerProjections[0];
    assert.equal(ledgerProjection.TransactionIds[0], transactionProjection.Id);
  });
});
