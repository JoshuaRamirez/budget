import { assert } from "chai";
import "mocha";
import { DepositCreatedEvent } from "../../../../source/Events/DepositCreatedEvent";
import { LinkDepositToPlannedDepositService } from "../../../../source/Services/Links/LinkDepositToPlannedDepositService";

describe("LinkDepositToPlannedDepositService", () => {
  it("should import", () => {
    assert.exists(LinkDepositToPlannedDepositService);
  });
  it("should instantiate with singleton", () => {
    const service = LinkDepositToPlannedDepositService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = LinkDepositToPlannedDepositService.Instance;
    const event = new DepositCreatedEvent();
    service.Handle(event);
  });
});
