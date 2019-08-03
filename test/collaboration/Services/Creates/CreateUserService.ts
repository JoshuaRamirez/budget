import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../source/Core/ProjectionStore";
import { Subscriptions } from "../../../../source/Core/Subscriptions";
import { UserRequestedEvent } from "../../../../source/Events/UserRequestedEvent";
import { AccountProjection } from "../../../../source/Projections/AccountProjection";
import { LedgerProjection } from "../../../../source/Projections/LedgerProjection";
import { UserProjection } from "../../../../source/Projections/UserProjection";
import { CreateUserService } from "../../../../source/Services/Creates/CreateUserService";


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
    const userProjections = projectionStore.GetProjections(UserProjection);
    const userProjection: UserProjection = userProjections[0];
    assert.exists(userProjection);
    const accountProjections = projectionStore.GetProjections(AccountProjection);
    const accountProjection: AccountProjection = accountProjections[0];
    assert.exists(accountProjection);
    const ledgerProjections = projectionStore.GetProjections(LedgerProjection);
    const ledgerProjection: LedgerProjection = ledgerProjections[0];
    assert.exists(ledgerProjection);
    assert.equal(userProjection.AccountIds[0], accountProjection.Id);
    assert.equal(accountProjection.LedgerId, ledgerProjection.Id);
  });
});
