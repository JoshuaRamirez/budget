import { assert } from "chai";
import "mocha";
import { UserRequestedEvent } from "../../../../Source/Events/Requested/Creation/UserRequestedEvent";
import { AccountProjection } from "../../../../Source/Projections/AccountProjection";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { LedgerProjection } from "../../../../Source/Projections/LedgerProjection";
import { UserProjection } from "../../../../Source/Projections/UserProjection";
import { CreateUserService } from "../../../../Source/Services/Creates/CreateUserService";
import { System } from "../../../../Source/System/System";

describe("CreateUserService", () => {
  beforeEach(async () => {
    await System.Shutdown();
    await System.Startup();
  });
  it("should create initial projections", async () => {
    const event = new UserRequestedEvent();
    await event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const userProjections = await projectionStore.GetProjections<UserProjection>(UserProjection);
    const userProjection: UserProjection = userProjections[0];
    assert.exists(userProjection);
    const accountProjections = await projectionStore.GetProjections<AccountProjection>(AccountProjection);
    const accountProjection: AccountProjection = accountProjections[0];
    assert.exists(accountProjection);
    const ledgerProjections = await projectionStore.GetProjections<LedgerProjection>(LedgerProjection);
    const ledgerProjection: LedgerProjection = ledgerProjections[0];
    assert.exists(ledgerProjection);
    assert.equal(userProjection.AccountIds[0], accountProjection.Id);
    assert.equal(accountProjection.LedgerId, ledgerProjection.Id);
  });
});