import { assert } from "chai";
import "mocha";
import { LinkTransactionToLedgerService } from "../../../../Source/Services/Links/LinkTransactionToLedgerService";
import { NewTransactionCreatedEvent } from "../../../Helpers";

describe("LinkTransactionToLedgerService", () => {
  it("should import", () => {
    assert.exists(LinkTransactionToLedgerService);
  });
  it("should instantiate with singleton", () => {
    const service = LinkTransactionToLedgerService.Instance;
    assert.exists(service);
  });
  it("should process", async () => {
    const service = LinkTransactionToLedgerService.Instance;
    const event = await NewTransactionCreatedEvent();
    await service.Receive(event);
  });
});
