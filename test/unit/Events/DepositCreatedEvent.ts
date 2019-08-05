import { assert } from "chai";
import "mocha";
import {DepositCreatedEvent} from "../../../source/Events/DepositCreatedEvent";

describe("DepositCreatedEvent", () => {
  it("should import", () => {
    assert.exists(DepositCreatedEvent);
  });
  it("should instantiate", () => {
    const event = new DepositCreatedEvent();
    assert.exists(event);
  });
  it("should publish", () => {
    const event = new DepositCreatedEvent();
    event.Publish();
  });
});
