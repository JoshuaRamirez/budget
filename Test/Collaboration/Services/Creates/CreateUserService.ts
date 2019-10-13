import { assert } from "chai";
import "mocha";
import { UserRequestedEvent } from "../../../../Source/Events/UserRequestedEvent";
import { AccountProjection } from "../../../../Source/Projections/AccountProjection";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { LedgerProjection } from "../../../../Source/Projections/LedgerProjection";
import { UserProjection } from "../../../../Source/Projections/UserProjection";
import { Subscriptions } from "../../../../Source/Services/Core/Subscriptions";
import { CreateUserService } from "../../../../Source/Services/Creates/CreateUserService";


describe("CreateUserService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  it("should create initial projections", () => {
    const event = new UserRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const userProjections = projectionStore.GetProjections<UserProjection>(UserProjection);
    const userProjection: UserProjection = userProjections[0];
    assert.exists(userProjection);
    const accountProjections = projectionStore.GetProjections<AccountProjection>(AccountProjection);
    const accountProjection: AccountProjection = accountProjections[0];
    assert.exists(accountProjection);
    const ledgerProjections = projectionStore.GetProjections<LedgerProjection>(LedgerProjection);
    const ledgerProjection: LedgerProjection = ledgerProjections[0];
    assert.exists(ledgerProjection);
    assert.equal(userProjection.AccountIds[0], accountProjection.Id);
    assert.equal(accountProjection.LedgerId, ledgerProjection.Id);
  });
});
