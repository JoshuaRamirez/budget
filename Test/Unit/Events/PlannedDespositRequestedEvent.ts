import { assert } from "chai";
import "mocha";
import { PlannedDepositRequestedEvent } from "../../../Source/Events/PlannedDepositRequestedEvent";

describe("PlannedDepositRequestedEvent", () => {
  it("should import", () => {
    assert.exists(PlannedDepositRequestedEvent);
  });
  it("should instantiate", () => {
    const event = new PlannedDepositRequestedEvent();
    assert.exists(event);
  });
  it("should publish", () => {
    const event = new PlannedDepositRequestedEvent();
    event.Publish();
  });
});
