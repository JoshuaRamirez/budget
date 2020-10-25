import { assert } from "chai";
import "mocha";
import { ExpenseRequestedEvent } from "../../../../../Source/Events/Requested/Creation/ExpenseRequestedEvent";

describe("ExpenseRequestedEvent", () => {
  it("should import", () => {
    assert.exists(ExpenseRequestedEvent);
  });
  it("should instantiate", () => {
    const event = new ExpenseRequestedEvent();
    assert.exists(event);
  });
  it("should publish", async () => {
    const event = new ExpenseRequestedEvent();
    await event.Publish();
  });
});
