import { assert } from "chai";
import "mocha";
import { DepositRequestedEvent } from "../../../../Source/Events/Requested/Creation/DepositRequestedEvent";
import { CreateDepositService } from "../../../../Source/Services/Creates/CreateDepositService";

describe("CreateDepositService", () => {
  it("should import", () => {
    assert.exists(CreateDepositService);
  });
  it("should instantiate with singleton", () => {
    const service = CreateDepositService.Instance;
    assert.exists(service);
  });
  it("should process", async () => {
    const service = CreateDepositService.Instance;
    const event = new DepositRequestedEvent();
    await service.Receive(event);
  });
});
