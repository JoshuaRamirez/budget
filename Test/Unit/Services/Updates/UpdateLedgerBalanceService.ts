import { assert } from "chai";
import "mocha";
import { TransactionCreatedEvent } from "../../../../Source/Events/Created/TransactionCreatedEvent";
import { UpdateLedgerBalanceService } from "../../../../Source/Services/Domain/UpdateLedgerBalanceService";

describe("UpdateLedgerBalanceService", () => {
  it("should import", () => {
    assert.exists(UpdateLedgerBalanceService);
  });
  it("should instantiate with singleton", () => {
    const service = UpdateLedgerBalanceService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = UpdateLedgerBalanceService.Instance;
    const event = new TransactionCreatedEvent();
    service.Handle(event);
  });
});
