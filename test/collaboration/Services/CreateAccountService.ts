import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../source/Core/ProjectionStore";
import { AccountRequestedEvent } from "../../../source/Events/AccountRequestedEvent";
import { AccountProjection } from "../../../source/Projections/AccountProjection";
import { CreateAccountService } from "../../../source/Services/CreateAccountService";


describe("CreateAccountService", () => {
  it("should create projection", () => {
    const service = CreateAccountService.Instance;
    service.Subscribe();
    const event = new AccountRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(AccountProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
