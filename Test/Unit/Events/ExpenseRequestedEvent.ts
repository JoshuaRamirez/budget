import { assert } from "chai";
import "mocha";
import {ExpenseRequestedEvent} from "../../../Source/Events/ExpenseRequestedEvent";

describe("ExpenseRequestedEvent", () => {
  it("should import", () => {
    assert.exists(ExpenseRequestedEvent);
  });
  it("should instantiate", () => {
    const event = new ExpenseRequestedEvent();
    assert.exists(event);
  });
  it("should publish", () => {
    const event = new ExpenseRequestedEvent();
    event.Publish();
  });
});
