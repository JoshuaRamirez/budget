import { assert } from "chai";
import "mocha";
import { DepositCreatedEvent } from "../../../../Source/Events/Created/DepositCreatedEvent";

describe("DepositCreatedEvent", () => {
  it("should import", () => {
    assert.exists(DepositCreatedEvent);
  });
  it("should instantiate", () => {
    const event = new DepositCreatedEvent();
    assert.exists(event);
  });
  it("should publish", async () => {
    const event = new DepositCreatedEvent();
    await event.Publish();
  });
});
