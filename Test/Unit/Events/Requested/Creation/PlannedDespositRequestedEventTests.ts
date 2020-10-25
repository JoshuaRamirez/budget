import { assert } from "chai";
import "mocha";
import { PlannedDepositRequestedEvent } from "../../../../../Source/Events/Requested/Creation/PlannedDepositRequestedEvent";

describe("PlannedDepositRequestedEvent", () => {
  it("should import", () => {
    assert.exists(PlannedDepositRequestedEvent);
  });
  it("should instantiate", () => {
    const event = new PlannedDepositRequestedEvent();
    assert.exists(event);
  });
  it("should publish", async () => {
    const event = new PlannedDepositRequestedEvent();
    await event.Publish();
  });
});
