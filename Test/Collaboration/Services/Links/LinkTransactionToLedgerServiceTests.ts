import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { LedgerProjection } from "../../../../Source/Projections/LedgerProjection";
import { TransactionProjection } from "../../../../Source/Projections/TransactionProjection";
import { LinkTransactionToLedgerService } from "../../../../Source/Services/Links/LinkTransactionToLedgerService";
import { Subscriptions } from "../../../../Source/Subscriptions";
import { NewTransactionCreatedEvent } from "../../../Helpers";

describe("LinkTransactionToLedgerService", () => {
  beforeEach(async () => {
    await Subscriptions.Release();
    await Subscriptions.Create();
    await ProjectionStore.Instance.ClearAll();
  });
  it("should link transaction to ledger", async () => {
    const transactionCreatedEvent = await NewTransactionCreatedEvent();
    await transactionCreatedEvent.Publish();
    const transactionProjection = await TransactionProjection.Get(transactionCreatedEvent.TransactionId);
    const ledgerProjection = await LedgerProjection.Get(transactionProjection.LedgerId);
    assert.equal(ledgerProjection.TransactionIds[0], transactionCreatedEvent.TransactionId);
  });
});
