import { assert } from "chai";
import "mocha";
import { TransactionCreatedEvent } from "../../../../source/Events/TransactionCreatedEvent";
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
    const event = new TransactionCreatedEvent("a", "1");
    service.Process(event);
  });
});
