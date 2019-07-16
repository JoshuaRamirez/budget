import { assert } from "chai";
import "mocha";
import {TransactionRequestedEvent} from "../../../source/Events/TransactionRequestedEvent";

describe("TransactionRequestedEvent", () => {
  it("should import", () => {
    assert.exists(TransactionRequestedEvent);
  });
  it("should instantiate", () => {
    const event = new TransactionRequestedEvent("A", 1);
    assert.exists(event);
  });
  it("should publish", () => {
    const event = new TransactionRequestedEvent("A", 1);
    event.Publish();
  });
});
