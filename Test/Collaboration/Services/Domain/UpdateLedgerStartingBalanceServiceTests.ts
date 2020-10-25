import { assert } from "chai";
import "mocha";
import { LedgerStartingBalanceUpdateRequestedEvent } from "../../../../Source/Events/Requested/Mutation/LedgerStartingBalanceUpdateRequestedEvent";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { LedgerProjection } from "../../../../Source/Projections/LedgerProjection";
import { UpdateLedgerStartingBalanceService } from "../../../../Source/Services/Domain/UpdateLedgerStartingBalanceService";
import { Subscriptions } from "../../../../Source/Subscriptions";

describe("UpdateLedgerStartingBalanceService", () => {
  beforeEach(async () => {
    await Subscriptions.Release();
    await Subscriptions.Create();
    await ProjectionStore.Instance.ClearAll();
  });
  it("should update projection", async () => {
    const service = UpdateLedgerStartingBalanceService.Instance;
    service.Subscribe();
    const ledgerProjection = new LedgerProjection();
    await ledgerProjection.Project();
    const ledgerStartingBalanceUpdateRequestedEvent = new LedgerStartingBalanceUpdateRequestedEvent();
    ledgerStartingBalanceUpdateRequestedEvent.LedgerId = ledgerProjection.Id;
    ledgerStartingBalanceUpdateRequestedEvent.StartingBalance = 10;
    await ledgerStartingBalanceUpdateRequestedEvent.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = await projectionStore.GetProjections<LedgerProjection>(LedgerProjection);
    const projection = projections[0];
    assert.equal(projection.Balance, 10);
  });
});
