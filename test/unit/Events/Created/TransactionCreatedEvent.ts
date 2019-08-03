import { assert } from "chai";
import "mocha";
import {TransactionCreatedEvent} from "../../../../source/Events/TransactionCreatedEvent";

describe("TransactionCreatedEvent", () => {
  it("should import", () => {
    assert.exists(TransactionCreatedEvent);
  });
  it("should instantiate", () => {
    const event = new TransactionCreatedEvent();
    assert.exists(event);
  });
  it("should publish", () => {
    const event = new TransactionCreatedEvent();
    event.Publish();
  });
});
