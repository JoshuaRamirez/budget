import { assert } from "chai";
import "mocha";
import { PayerRequestedEvent } from "../../../../../Source/Events/Requested/Creation/PayerRequestedEvent";

describe("PayerRequestedEvent", () => {
  it("should import", () => {
    assert.exists(PayerRequestedEvent);
  });
  it("should instantiate", () => {
    const event = new PayerRequestedEvent();
    assert.exists(event);
  });
  it("should publish", async () => {
    const event = new PayerRequestedEvent();
    await event.Publish();
  });
});