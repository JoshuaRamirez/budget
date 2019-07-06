import { assert } from "chai";
import "mocha";
import {LinkLedgerToTransactionService} from "../../../source/Services/LinkLedgerToTransactionService";

describe("LinkLedgerToTransactionService", () => {
  it("should import", () => {
    assert.exists(LinkLedgerToTransactionService);
  });
  it("should instantiate", () => {
    const service = new LinkLedgerToTransactionService();
    assert.exists(service);
  });
  it("should instantiate with singleton", () => {
    const service = LinkLedgerToTransactionService.Instance;
    assert.exists(service);
  });
});