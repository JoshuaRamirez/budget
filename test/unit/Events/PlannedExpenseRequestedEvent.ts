import { assert } from "chai";
import "mocha";
import {PlannedExpenseRequestedEvent} from "../../../source/Events/PlannedExpenseRequestedEvent";

describe("PlannedExpenseRequestedEvent", () => {
  it("should import", () => {
    assert.exists(PlannedExpenseRequestedEvent);
  });
  it("should instantiate", () => {
    const event = new PlannedExpenseRequestedEvent();
    assert.exists(event);
  });
  it("should publish", () => {
    const event = new PlannedExpenseRequestedEvent();
    event.Publish();
  });
});
