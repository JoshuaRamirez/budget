import { assert } from "chai";
import "mocha";
import { BudgetRequestedEvent } from "../../../Source/Events/Requested/Creation/BudgetRequestedEvent";

describe("BudgetRequestedEvent", () => {
  it("should import", () => {
    assert.exists(BudgetRequestedEvent);
  });
  it("should instantiate", () => {
    const event = new BudgetRequestedEvent();
    assert.exists(event);
  });
  it("should publish", () => {
    const event = new BudgetRequestedEvent();
    event.Publish();
  });
});
