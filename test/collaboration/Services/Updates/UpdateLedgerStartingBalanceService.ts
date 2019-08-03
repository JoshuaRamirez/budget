import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../source/Core/ProjectionStore";
import { Subscriptions } from "../../../../source/Core/Subscriptions";
import { LedgerStartingBalanceUpdateRequestedEvent } from "../../../../source/Events/LedgerStartingBalanceUpdateRequestedEvent";
import { LedgerProjection } from "../../../../source/Projections/LedgerProjection";
import { UpdateLedgerStartingBalanceService } from "../../../../source/Services/Updates/UpdateLedgerStartingBalanceService";


describe("UpdateLedgerStartingBalanceService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  it("should update projection", () => {
    const service = UpdateLedgerStartingBalanceService.Instance;
    service.Subscribe();
    const ledgerProjection = new LedgerProjection();
    ledgerProjection.Project();
    const ledgerStartingBalanceUpdateRequestedEvent = new LedgerStartingBalanceUpdateRequestedEvent();
    ledgerStartingBalanceUpdateRequestedEvent.LedgerId = ledgerProjection.Id;
    ledgerStartingBalanceUpdateRequestedEvent.StartingBalance = 10;
    ledgerStartingBalanceUpdateRequestedEvent.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(LedgerProjection);
    const projection = projections[0];
    assert.equal(projection.Balance, 10);
  });
});
