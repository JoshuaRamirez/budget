import { assert } from "chai";
import "mocha";
import {CategoryRequestedEvent} from "../../../../source/Events/CategoryRequestedEvent";

describe("CategoryRequestedEvent", () => {

  it("should import", () => {
    assert.exists(CategoryRequestedEvent);
  });
  it("should instantiate", () => {
    const event = new CategoryRequestedEvent();
    assert.exists(event);
  });
  it("should publish", () => {
    const event = new CategoryRequestedEvent();
    event.Publish();
  });

});
