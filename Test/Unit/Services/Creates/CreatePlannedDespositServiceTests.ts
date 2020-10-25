import { assert } from "chai";
import "mocha";
import { PlannedDepositRequestedEvent } from "../../../../Source/Events/Requested/Creation/PlannedDepositRequestedEvent";
import { CreatePlannedDepositService } from "../../../../Source/Services/Creates/CreatePlannedDepositService";

describe("CreatePlannedDepositService", () => {
  it("should import", () => {
    assert.exists(CreatePlannedDepositService);
  });
  it("should instantiate with singleton", () => {
    const service = CreatePlannedDepositService.Instance;
    assert.exists(service);
  });
  it("should process", async () => {
    const service = CreatePlannedDepositService.Instance;
    const event = new PlannedDepositRequestedEvent();
    await service.Receive(event);
  });
});
