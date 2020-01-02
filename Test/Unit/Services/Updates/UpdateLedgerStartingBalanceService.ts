import { assert } from "chai";
import "mocha";
import { LedgerStartingBalanceUpdateRequestedEvent } from "../../../../Source/Events/Requested/Mutation/LedgerStartingBalanceUpdateRequestedEvent";
import {UpdateLedgerStartingBalanceService} from "../../../../Source/Services/Updates/UpdateLedgerStartingBalanceService";

describe("UpdateLedgerStartingBalanceService", () => {
  it("should import", () => {
    assert.exists(UpdateLedgerStartingBalanceService);
  });
  it("should instantiate with singleton", () => {
    const service = UpdateLedgerStartingBalanceService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = UpdateLedgerStartingBalanceService.Instance;
    const event = new LedgerStartingBalanceUpdateRequestedEvent();
    service.Handle(event);
  });
});
