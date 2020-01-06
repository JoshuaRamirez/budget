import { assert } from "chai";
import "mocha";
import { AccountRequestedEvent } from "../../../../Source/Events/Requested/Creation/AccountRequestedEvent";
import { CreateAccountService } from "../../../../Source/Services/Creates/CreateAccountService";

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
    service.Receive(event);
  });
});
