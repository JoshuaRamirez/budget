import { assert } from "chai";
import "mocha";
import { AllocationRequestedEvent } from "../../../source/Events/AllocationRequestedEvent";
import {CreateAllocationTransactionService} from "../../../source/Services/CreateAllocationTransactionService";

describe("CreateAllocationTransactionService", () => {
  it("should import", () => {
    assert.exists(CreateAllocationTransactionService);
  });
  it("should instantiate", () => {
    const service = new CreateAllocationTransactionService();
    assert.exists(service);
  });
  it("should instantiate with singleton", () => {
    const service = CreateAllocationTransactionService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = CreateAllocationTransactionService.Instance;
    const event = new AllocationRequestedEvent();
    service.Process(event);
  });
});
