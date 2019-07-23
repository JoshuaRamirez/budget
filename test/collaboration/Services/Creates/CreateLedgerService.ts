import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../source/Core/ProjectionStore";
import { LedgerRequestedEvent } from "../../../../source/Events/LedgerRequestedEvent";
import { LedgerProjection } from "../../../../source/Projections/LedgerProjection";
import { CreateLedgerService } from "../../../../source/Services/Creates/CreateLedgerService";


describe("CreateLedgerService", () => {
  it("should create projection", () => {
    const service = CreateLedgerService.Instance;
    service.Subscribe();
    const event = new LedgerRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(LedgerProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
