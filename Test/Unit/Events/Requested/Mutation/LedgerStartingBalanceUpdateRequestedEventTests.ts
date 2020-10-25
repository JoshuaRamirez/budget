import { assert } from "chai";
import "mocha";
import { LedgerStartingBalanceUpdateRequestedEvent } from "../../../../../Source/Events/Requested/Mutation/LedgerStartingBalanceUpdateRequestedEvent";

describe("LedgerStartingBalanceUpdateRequestedEvent", () => {
  it("should import", () => {
    assert.exists(LedgerStartingBalanceUpdateRequestedEvent);
  });
  it("should instantiate", () => {
    const event = new LedgerStartingBalanceUpdateRequestedEvent();
    assert.exists(event);
  });
  it("should publish", async () => {
    const event = new LedgerStartingBalanceUpdateRequestedEvent();
    await event.Publish();
  });
});
