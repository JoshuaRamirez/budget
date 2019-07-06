import { assert } from "chai";
import "mocha";
import {PayeeRequestedEvent} from "../../../source/Events/PayeeRequestedEvent";

describe("PayeeRequestedEvent", () => {
  it("should import", () => {
    assert.exists(PayeeRequestedEvent);
  });
  it("should instantiate", () => {
    const event = new PayeeRequestedEvent();
    assert.exists(event);
  });
  it("should publish", () => {
    const event = new PayeeRequestedEvent();
    event.Publish();
  });
});
