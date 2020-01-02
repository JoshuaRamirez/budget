import { assert } from "chai";
import "mocha";
import { UserRequestedEvent } from "../../../../Source/Events/Requested/Creation/UserRequestedEvent";
import {CreateUserService} from "../../../../Source/Services/Creates/CreateUserService";

describe("CreateUserService", () => {
  it("should import", () => {
    assert.exists(CreateUserService);
  });
  it("should instantiate with singleton", () => {
    const service = CreateUserService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = CreateUserService.Instance;
    const event = new UserRequestedEvent();
    service.Receive(event);
  });
});
