import { assert } from "chai";
import "mocha";
import { ExpenseCreatedEvent } from "../../../../Source/Events/Created/ExpenseCreatedEvent";

describe("ExpenseCreatedEvent", () => {
  it("should import", () => {
    assert.exists(ExpenseCreatedEvent);
  });
  it("should instantiate", () => {
    const event = new ExpenseCreatedEvent();
    assert.exists(event);
  });
  it("should publish", () => {
    const event = new ExpenseCreatedEvent();
    event.Publish();
  });
});
