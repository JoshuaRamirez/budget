import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../source/Core/ProjectionStore";
import { Subscriptions } from "../../../../source/Core/Subscriptions";
import { LedgerCreatedEvent } from "../../../../source/Events/LedgerCreatedEvent";
import { AccountProjection } from "../../../../source/Projections/AccountProjection";
import { LedgerProjection } from "../../../../source/Projections/LedgerProjection";
import { LinkLedgerToAccountService } from "../../../../source/Services/Links/LinkLedgerToAccountService";


describe("LinkLedgerToAccountService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  it("should add the ledger id to the account link list", () => {
    const service = LinkLedgerToAccountService.Instance;
    service.Subscribe();
    const accountProjection = new AccountProjection();
    accountProjection.Project();
    const ledgerProjection = new LedgerProjection();
    ledgerProjection.AccountId = accountProjection.Id;
    ledgerProjection.Project();
    const event = new LedgerCreatedEvent();
    event.LedgerId = ledgerProjection.Id;
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(AccountProjection);
    const projection = projections[0];
    assert.equal(projection.LedgerId, ledgerProjection.Id);
  });
});
