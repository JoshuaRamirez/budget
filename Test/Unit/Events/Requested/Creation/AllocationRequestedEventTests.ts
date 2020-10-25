import { assert } from "chai";
import "mocha";
import { AllocationRequestedEvent } from "../../../../../Source/Events/Requested/Creation/AllocationRequestedEvent";

describe("AllocationRequestedEvent", () => {
  it("should import", () => {
    assert.exists(AllocationRequestedEvent);
  });
  it("should instantiate", () => {
    const event = new AllocationRequestedEvent();
    assert.exists(event);
  });
  it("should publish", async () => {
    const event = new AllocationRequestedEvent();
    await event.Publish();
  });
});