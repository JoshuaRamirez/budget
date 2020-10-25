import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { LedgerProjection } from "../../../../Source/Projections/LedgerProjection";
import { CreateLedgerService } from "../../../../Source/Services/Creates/CreateLedgerService";
import { System } from "../../../../Source/System/System";
import { NewLedgerRequestedEvent } from "../../../Helpers";

describe("CreateLedgerService", () => {
  beforeEach(async () => {
    await System.Shutdown();
    await System.Startup();
  });
  it("should create projection", async () => {
    const event = await NewLedgerRequestedEvent();
    await event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = await projectionStore.GetProjections(LedgerProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
