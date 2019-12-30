import { assert } from "chai";
import "mocha";
import { AccountProjection } from "../../../../Source/Projections/AccountProjection";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { LinkLedgerToAccountService } from "../../../../Source/Services/Links/LinkLedgerToAccountService";
import { Subscriptions } from "../../../../Source/Subscriptions";
import { NewLedgerCreatedEvent } from "../../../Helpers";


describe("LinkLedgerToAccountService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  it("should add the ledger id to the account link list", () => {
    const ledgerCreatedEvent = NewLedgerCreatedEvent();
    ledgerCreatedEvent.Publish();
    const accountProjection = AccountProjection.Get(ledgerCreatedEvent.AccountId);
    assert.equal(accountProjection.LedgerId, ledgerCreatedEvent.LedgerId);
  });
});
