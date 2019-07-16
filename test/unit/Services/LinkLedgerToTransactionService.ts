import { assert } from "chai";
import "mocha";
import { TransactionCreatedEvent } from "../../../source/Events/TransactionCreatedEvent";
import {LinkLedgerToTransactionService} from "../../../source/Services/LinkLedgerToTransactionService";

describe("LinkLedgerToTransactionService", () => {
  it("should import", () => {
    assert.exists(LinkLedgerToTransactionService);
  });
  it("should instantiate with singleton", () => {
    const service = LinkLedgerToTransactionService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = LinkLedgerToTransactionService.Instance;
    const event = new TransactionCreatedEvent("A", 1);
    service.Process(event);
  });
});
