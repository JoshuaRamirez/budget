import { assert } from "chai";
import "mocha";
import {CreateExpenseTransactionService} from "../../../source/Services/CreateExpenseTransactionService";

describe("CreateExpenseTransactionService", () => {
  it("should import", () => {
    assert.exists(CreateExpenseTransactionService);
  });
  it("should instantiate", () => {
    const service = new CreateExpenseTransactionService();
    assert.exists(service);
  });
  it("should instantiate with singleton", () => {
    const service = CreateExpenseTransactionService.Instance;
    assert.exists(service);
  });
  it("should instantiate with singleton", () => {
    const service = CreateExpenseTransactionService.Instance;
    assert.exists(service);
  });
});
