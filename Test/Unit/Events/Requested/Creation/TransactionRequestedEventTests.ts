import { assert } from "chai";
import "mocha";
import { TransactionRequestedEvent } from "../../../../../Source/Events/Requested/Creation/TransactionRequestedEvent";

describe("TransactionRequestedEvent", () => {
  it("should import", () => {
    assert.exists(TransactionRequestedEvent);
  });
  it("should instantiate", () => {
    const event = new TransactionRequestedEvent();
    assert.exists(event);
  });
  it("should publish", async () => {
    const event = new TransactionRequestedEvent();
    await event.Publish();
  });
});