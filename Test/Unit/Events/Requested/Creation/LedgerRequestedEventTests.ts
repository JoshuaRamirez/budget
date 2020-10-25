import { assert } from "chai";
import "mocha";
import { LedgerRequestedEvent } from "../../../../../Source/Events/Requested/Creation/LedgerRequestedEvent";

describe("LedgerRequestedEvent", () => {
  it("should import", () => {
    assert.exists(LedgerRequestedEvent);
  });
  it("should instantiate", () => {
    const event = new LedgerRequestedEvent();
    assert.exists(event);
  });
  it("should publish", async () => {
    const event = new LedgerRequestedEvent();
    await event.Publish();
  });
});