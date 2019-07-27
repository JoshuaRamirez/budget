import { assert } from "chai";
import "mocha";
import { UserRequestedEvent } from "../../../source/Events/UserRequestedEvent";
import {CreateUserService} from "../../../source/Services/Creates/CreateUserService";

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
    service.Process(event);
  });
});
