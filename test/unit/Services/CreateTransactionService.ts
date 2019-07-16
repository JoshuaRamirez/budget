import { assert } from "chai";
import "mocha";
import {CreateTransactionService} from "../../../source/Services/CreateTransactionService";

describe("CreateTransactionService", () => {
  it("should import", () => {
    assert.exists(CreateTransactionService);
  });
  it("should instantiate with singleton", () => {
    const service = CreateTransactionService.Instance;
    assert.exists(service);
  });
});
