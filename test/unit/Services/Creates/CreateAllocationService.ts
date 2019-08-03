import { assert } from "chai";
import "mocha";
import { AllocationRequestedEvent } from "../../../../source/Events/AllocationRequestedEvent";
import {CreateAllocationService} from "../../../../source/Services/Creates/CreateAllocationService";

describe("CreateAllocationService", () => {
  it("should import", () => {
    assert.exists(CreateAllocationService);
  });
  it("should instantiate with singleton", () => {
    const service = CreateAllocationService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = CreateAllocationService.Instance;
    const event = new AllocationRequestedEvent();
    service.Process(event);
  });
});
