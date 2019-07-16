import { assert } from "chai";
import "mocha";
import { AccountRequestedEvent } from "../../../source/Events/AccountRequestedEvent";
import {CreateAccountService} from "../../../source/Services/CreateAccountService";

describe("CreateAccountService", () => {
  it("should import", () => {
    assert.exists(CreateAccountService);
  });
  it("should instantiate with singleton", () => {
    const service = CreateAccountService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = CreateAccountService.Instance;
    const event = new AccountRequestedEvent();
    service.Process(event);
  });
});
