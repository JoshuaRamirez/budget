import { assert } from "chai";
import "mocha";
import { AllocationRequestedEvent } from "../../../source/Events/AllocationRequestedEvent";
import {RequestAllocationTransactionService} from "../../../source/Services/Requests/RequestAllocationTransactionService";

describe("RequestAllocationTransactionService", () => {
  it("should import", () => {
    assert.exists(RequestAllocationTransactionService);
  });
  it("should instantiate with singleton", () => {
    const service = RequestAllocationTransactionService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = RequestAllocationTransactionService.Instance;
    const event = new AllocationRequestedEvent();
    service.Process(event);
  });
});
