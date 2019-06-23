import { assert } from "chai";
import "mocha";
import {UpdateLedgerStartingBalanceService} from "../../../source/Services/UpdateLedgerStartingBalanceService";

describe("UpdateLedgerStartingBalanceService", () => {
  it("should import", () => {
    assert.exists(UpdateLedgerStartingBalanceService);
  });
  it("should instantiate", () => {
    const service = new UpdateLedgerStartingBalanceService();
    assert.exists(service);
  });
  it("should instantiate with singleton", () => {
    const service = UpdateLedgerStartingBalanceService.Instance;
    assert.exists(service);
  });
});
