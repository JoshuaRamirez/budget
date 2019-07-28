import { assert } from "chai";
import "mocha";
import {LedgerStartingBalanceUpdateRequestedEvent} from "../../../../source/Events/LedgerStartingBalanceUpdateRequestedEvent";

describe("LedgerStartingBalanceUpdateRequestedEvent", () => {
  it("should import", () => {
    assert.exists(LedgerStartingBalanceUpdateRequestedEvent);
  });
  it("should instantiate", () => {
    const event = new LedgerStartingBalanceUpdateRequestedEvent();
    assert.exists(event);
  });
  it("should publish", () => {
    const event = new LedgerStartingBalanceUpdateRequestedEvent();
    event.Publish();
  });
});
