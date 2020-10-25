import { assert } from "chai";
import "mocha";
import { PlannedExpenseRequestedEvent } from "../../../../../Source/Events/Requested/Creation/PlannedExpenseRequestedEvent";

describe("PlannedExpenseRequestedEvent", () => {
  it("should import", () => {
    assert.exists(PlannedExpenseRequestedEvent);
  });
  it("should instantiate", () => {
    const event = new PlannedExpenseRequestedEvent();
    assert.exists(event);
  });
  it("should publish", async () => {
    const event = new PlannedExpenseRequestedEvent();
    await event.Publish();
  });
});
