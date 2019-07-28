import { assert } from "chai";
import "mocha";
import { ExpenseRequestedEvent } from "../../../../source/Events/ExpenseRequestedEvent";
import {RequestExpenseTransactionService} from "../../../../source/Services/Requests/RequestExpenseTransactionService";

describe("RequestExpenseTransactionService", () => {
  it("should import", () => {
    assert.exists(RequestExpenseTransactionService);
  });
  it("should instantiate with singleton", () => {
    const service = RequestExpenseTransactionService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = RequestExpenseTransactionService.Instance;
    const event = new ExpenseRequestedEvent();
    service.Process(event);
  });
});
