import { assert } from "chai";
import "mocha";
import { AllocationRequestedEvent } from "../../../../Source/Events/Requested/Creation/AllocationRequestedEvent";
import {CreateAllocationService} from "../../../../Source/Services/Creates/CreateAllocationService";

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
    service.Receive(event);
  });
});
