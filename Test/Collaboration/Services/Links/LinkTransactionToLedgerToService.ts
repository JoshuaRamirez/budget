import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { LedgerProjection } from "../../../../Source/Projections/LedgerProjection";
import { LinkTransactionToLedgerService } from "../../../../Source/Services/Links/LinkTransactionToLedgerService";
import { Subscriptions } from "../../../../Source/Subscriptions";
import { NewTransactionCreatedEvent } from "../../../Helpers";


describe("LinkTransactionToLedgerService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  it("should link transaction to ledger", () => {
    const transactionCreatedEvent = NewTransactionCreatedEvent();
    transactionCreatedEvent.Publish();
    const ledgerProjection = LedgerProjection.Get(transactionCreatedEvent.LedgerId);
    assert.equal(ledgerProjection.TransactionIds[0], transactionCreatedEvent.TransactionId);
  });
});
