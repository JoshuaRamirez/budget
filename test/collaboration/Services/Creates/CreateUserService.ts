import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../source/Core/ProjectionStore";
import { UserRequestedEvent } from "../../../../source/Events/UserRequestedEvent";
import { AccountProjection } from "../../../../source/Projections/AccountProjection";
import { LedgerProjection } from "../../../../source/Projections/LedgerProjection";
import { UserProjection } from "../../../../source/Projections/UserProjection";
import { CreateAccountService } from "../../../../source/Services/Creates/CreateAccountService";
import { CreateLedgerService } from "../../../../source/Services/Creates/CreateLedgerService";
import { CreateUserService } from "../../../../source/Services/Creates/CreateUserService";


describe("CreateUserService", () => {
  it("should create initial projections", () => {
    const service = CreateUserService.Instance;
    const service2 = CreateAccountService.Instance;
    const service3 = CreateLedgerService.Instance;
    service.Subscribe();
    service2.Subscribe();
    service3.Subscribe();
    const event = new UserRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    let projections = projectionStore.GetProjections(UserProjection);
    let projection = projections[0];
    assert.exists(projection);
    projections = projectionStore.GetProjections(AccountProjection);
    projection = projections[0];
    assert.exists(projection);
    projections = projectionStore.GetProjections(LedgerProjection);
    projection = projections[0];
    assert.exists(projection);
  });
});
