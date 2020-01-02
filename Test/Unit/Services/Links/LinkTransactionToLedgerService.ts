import { assert } from "chai";
import "mocha";
import {LinkTransactionToLedgerService} from "../../../../Source/Services/Links/LinkTransactionToLedgerService";
import { NewTransactionCreatedEvent } from "../../../Helpers";

describe("LinkTransactionToLedgerService", () => {
  it("should import", () => {
    assert.exists(LinkTransactionToLedgerService);
  });
  it("should instantiate with singleton", () => {
    const service = LinkTransactionToLedgerService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = LinkTransactionToLedgerService.Instance;
    const event = NewTransactionCreatedEvent();
    service.Receive(event);
  });
});
