import { assert } from "chai";
import "mocha";
import { DepositRequestedEvent } from "../../../../source/Events/DepositRequestedEvent";
import { CreateDepositService } from "../../../../source/Services/Creates/CreateDepositService";

describe("CreateDepositService", () => {
  it("should import", () => {
    assert.exists(CreateDepositService);
  });
  it("should instantiate with singleton", () => {
    const service = CreateDepositService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = CreateDepositService.Instance;
    const event = new DepositRequestedEvent();
    service.Handle(event);
  });
});
