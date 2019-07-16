import { assert } from "chai";
import "mocha";
import { Handler } from "../../../source/Core/Handler";
import { ExpenseRequestedEvent } from "../../../source/Events/ExpenseRequestedEvent";
import { TransactionRequestedEvent } from "../../../source/Events/TransactionRequestedEvent";
import { RequestExpenseTransactionService } from "../../../source/Services/RequestExpenseTransactionService";

class TestHandler extends Handler<TransactionRequestedEvent> {
  public Triggered: boolean;
  constructor() {
    super(TransactionRequestedEvent);
  }
  public Process(event: TransactionRequestedEvent): void {
    this.Triggered = true;
  }
}

describe("RequestExpenseTransactionService", () => {
  it("should publish event", () => {
    const requestExpenseTransactionService = RequestExpenseTransactionService.Instance;
    requestExpenseTransactionService.Subscribe();
    const expenseRequestedEvent = new ExpenseRequestedEvent();
    const testHandler = new TestHandler();
    testHandler.Subscribe();
    expenseRequestedEvent.Publish();
    assert.isTrue(testHandler.Triggered);
  });
});
