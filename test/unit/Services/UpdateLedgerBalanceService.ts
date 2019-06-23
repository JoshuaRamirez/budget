import { assert } from "chai";
import "mocha";
import {UpdateLedgerBalanceService} from "../../../source/Services/UpdateLedgerBalanceService";

describe("UpdateLedgerBalanceService", () => {
  it("should import", () => {
    assert.exists(UpdateLedgerBalanceService);
  });
  it("should instantiate", () => {
    const service = new UpdateLedgerBalanceService();
    assert.exists(service);
  });
  it("should instantiate with singleton", () => {
    const service = UpdateLedgerBalanceService.Instance;
    assert.exists(service);
  });
});
