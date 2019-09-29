import { assert } from "chai";
import "mocha";
import { PlannedDepositRequestedEvent } from "../../../../source/Events/PlannedDepositRequestedEvent";
import {CreatePlannedDepositService} from "../../../../source/Services/Creates/CreatePlannedDepositService";

describe("CreatePlannedDepositService", () => {
  it("should import", () => {
    assert.exists(CreatePlannedDepositService);
  });
  it("should instantiate with singleton", () => {
    const service = CreatePlannedDepositService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = CreatePlannedDepositService.Instance;
    const event = new PlannedDepositRequestedEvent();
    service.Handle(event);
  });
});
