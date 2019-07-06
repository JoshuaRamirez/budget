import { assert } from "chai";
import "mocha";
import {CreateLedgerService} from "../../../source/Services/CreateLedgerService";

describe("CreateLedgerService", () => {
  it("should import", () => {
    assert.exists(CreateLedgerService);
  });
  it("should instantiate", () => {
    const createLedgerService = new CreateLedgerService();
    assert.exists(createLedgerService);
  });
  it("should instantiate with singleton", () => {
    const createLedgerService = CreateLedgerService.Instance;
    assert.exists(createLedgerService);
  });
});