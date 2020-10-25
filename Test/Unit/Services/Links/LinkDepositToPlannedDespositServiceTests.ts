import { assert } from "chai";
import "mocha";
import { LinkDepositToPlannedDepositService } from "../../../../Source/Services/Links/LinkDepositToPlannedDepositService";
import { NewDepositCreatedEvent } from "../../../Helpers";

describe("LinkDepositToPlannedDepositService", () => {
  it("should import", () => {
    assert.exists(LinkDepositToPlannedDepositService);
  });
  it("should instantiate with singleton", () => {
    const service = LinkDepositToPlannedDepositService.Instance;
    assert.exists(service);
  });
  it("should process", async () => {
    const linkDepositToPlannedDepositService = LinkDepositToPlannedDepositService.Instance;
    const depositCreatedEvent = await NewDepositCreatedEvent();
    await linkDepositToPlannedDepositService.Receive(depositCreatedEvent);
  });
});
