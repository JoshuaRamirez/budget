import { assert } from "chai";
import "mocha";
import {UserRequestedEvent} from "../../../source/Events/UserRequestedEvent";

describe("UserRequestedEvent", () => {
  it("should import", () => {
    assert.exists(UserRequestedEvent);
  });
  it("should instantiate", () => {
    const event = new UserRequestedEvent();
    assert.exists(event);
  });
  it("should publish", () => {
    const event = new UserRequestedEvent();
    event.Publish();
  });
});
