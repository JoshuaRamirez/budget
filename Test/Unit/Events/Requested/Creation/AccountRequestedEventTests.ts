import { assert } from "chai";
import "mocha";
import { AccountRequestedEvent } from "../../../../../Source/Events/Requested/Creation/AccountRequestedEvent";

describe("AccountRequestedEvent", () => {
  it("should import", () => {
    assert.exists(AccountRequestedEvent);
  });
  it("should instantiate", () => {
    const event = new AccountRequestedEvent();
    assert.exists(event);
  });
  it("should publish", async () => {
    const event = new AccountRequestedEvent();
    await event.Publish();
  });
});
