import { assert } from "chai";
import "mocha";
import { LedgerStartingBalanceUpdateRequestedEvent } from "../../../../Source/Events/LedgerStartingBalanceUpdateRequestedEvent";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { LedgerProjection } from "../../../../Source/Projections/LedgerProjection";
import { Subscriptions } from "../../../../Source/Services/Core/Subscriptions";
import { UpdateLedgerStartingBalanceService } from "../../../../Source/Services/Updates/UpdateLedgerStartingBalanceService";


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
    const projections = projectionStore.GetProjections<LedgerProjection>(LedgerProjection);
    const projection = projections[0];
    assert.equal(projection.Balance, 10);
  });
});