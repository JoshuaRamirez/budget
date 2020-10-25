import { assert } from "chai";
import "mocha";
import { CategoryRequestedEvent } from "../../../../../Source/Events/Requested/Creation/CategoryRequestedEvent";

describe("CategoryRequestedEvent", () => {
  it("should import", () => {
    assert.exists(CategoryRequestedEvent);
  });
  it("should instantiate", () => {
    const event = new CategoryRequestedEvent();
    assert.exists(event);
  });
  it("should publish", async () => {
    const event = new CategoryRequestedEvent();
    await event.Publish();
  });
});
