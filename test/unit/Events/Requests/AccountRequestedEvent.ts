import { assert } from "chai";
import "mocha";
import {AccountRequestedEvent} from "../../../../source/Events/AccountRequestedEvent";

describe("AccountRequestedEvent", () => {
  it("should import", () => {
    assert.exists(AccountRequestedEvent);
  });
  it("should instantiate", () => {
    const event = new AccountRequestedEvent();
    assert.exists(event);
  });
  it("should publish", () => {
    const event = new AccountRequestedEvent();
    event.Publish();
  });
});
