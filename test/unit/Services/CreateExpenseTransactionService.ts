import { assert } from "chai";
import "mocha";
import {RequestExpenseTransactionService} from "../../../source/Services/RequestExpenseTransactionService";

describe("RequestExpenseTransactionService", () => {
  it("should import", () => {
    assert.exists(RequestExpenseTransactionService);
  });
  it("should instantiate", () => {
    const service = new RequestExpenseTransactionService();
    assert.exists(service);
  });
  it("should instantiate with singleton", () => {
    const service = RequestExpenseTransactionService.Instance;
    assert.exists(service);
  });
  it("should instantiate with singleton", () => {
    const service = RequestExpenseTransactionService.Instance;
    assert.exists(service);
  });
});
