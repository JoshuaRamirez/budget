import { assert } from "chai";
import "mocha";
import { AccountProjection } from "../../../../Source/Projections/AccountProjection";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { LedgerProjection } from "../../../../Source/Projections/LedgerProjection";
import { LinkLedgerToAccountService } from "../../../../Source/Services/Links/LinkLedgerToAccountService";
import { Subscriptions } from "../../../../Source/Subscriptions";
import { NewLedgerCreatedEvent } from "../../../Helpers";

describe("LinkLedgerToAccountService", () => {
  beforeEach(async () => {
    await Subscriptions.Release();
    await Subscriptions.Create();
    await ProjectionStore.Instance.ClearAll();
  });
  it("should add the ledger id to the account link list", async () => {
    const ledgerCreatedEvent = await NewLedgerCreatedEvent();
    await ledgerCreatedEvent.Publish();
    const ledgerProjection = await LedgerProjection.Get(ledgerCreatedEvent.LedgerId);
    const accountProjection = await AccountProjection.Get(ledgerProjection.AccountId);
    assert.equal(accountProjection.LedgerId, ledgerCreatedEvent.LedgerId);
  });
});
