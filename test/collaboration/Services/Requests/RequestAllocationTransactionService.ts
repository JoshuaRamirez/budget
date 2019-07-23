import { assert } from "chai";
import "mocha";
import { Handler } from "../../../../source/Core/Handler";
import { AllocationRequestedEvent } from "../../../../source/Events/AllocationRequestedEvent";
import { TransactionRequestedEvent } from "../../../../source/Events/TransactionRequestedEvent";
import { RequestAllocationTransactionService } from "../../../../source/Services/Requests/RequestAllocationTransactionService";

class TestHandler extends Handler<TransactionRequestedEvent> {
  public Triggered: boolean;
  constructor() {
    super(TransactionRequestedEvent);
  }
  public Process(event: TransactionRequestedEvent): void {
    this.Triggered = true;
  }
}

describe("RequestAllocationTransactionService", () => {
  it("should publish event", () => {
    const requestAllocationTransactionService = RequestAllocationTransactionService.Instance;
    requestAllocationTransactionService.Subscribe();
    const allocationRequestedEvent = new AllocationRequestedEvent();
    const testHandler = new TestHandler();
    testHandler.Subscribe();
    allocationRequestedEvent.Publish();
    assert.isTrue(testHandler.Triggered);
  });
});
