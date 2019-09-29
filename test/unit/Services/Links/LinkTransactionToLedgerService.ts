import { assert } from "chai";
import "mocha";
import { TransactionCreatedEvent } from "../../../../source/Events/TransactionCreatedEvent";
import {LinkTransactionToLedgerService} from "../../../../source/Services/Links/LinkTransactionToLedgerService";

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
    const event = new TransactionCreatedEvent();
    service.Handle(event);
  });
});
