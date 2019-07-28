import { assert } from "chai";
import "mocha";
import {LedgerRequestedEvent} from "../../../../source/Events/LedgerRequestedEvent";

describe("LedgerRequestedEvent", () => {
  it("should import", () => {
    assert.exists(LedgerRequestedEvent);
  });
  it("should instantiate", () => {
    const event = new LedgerRequestedEvent();
    assert.exists(event);
  });
  it("should publish", () => {
    const event = new LedgerRequestedEvent();
    event.Publish();
  });
});
