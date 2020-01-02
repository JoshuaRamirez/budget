import { assert } from "chai";
import "mocha";
import {DepositRequestedEvent} from "../../../Source/Events/Requested/Creation/DepositRequestedEvent";

describe("DepositRequestedEvent", () => {
  it("should import", () => {
    assert.exists(DepositRequestedEvent);
  });
  it("should instantiate", () => {
    const event = new DepositRequestedEvent();
    assert.exists(event);
  });
  it("should publish", () => {
    const event = new DepositRequestedEvent();
    event.Publish();
  });
});
