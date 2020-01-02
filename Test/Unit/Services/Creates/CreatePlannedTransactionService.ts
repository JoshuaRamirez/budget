import { assert } from "chai";
import "mocha";
import { PlannedTransactionCreationRequestedEvent } from "../../../../Source/Events/Requested/Creation/PlannedTransactionCreationRequestedEvent";
import { CreatePlannedTransactionService } from "../../../../Source/Services/Creates/CreatePlannedTransactionService";

describe("CreatePlannedTransactionService", () => {
  it("should import", () => {
    assert.exists(CreatePlannedTransactionService);
  });
  it("should instantiate with singleton", () => {
    const service = CreatePlannedTransactionService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = CreatePlannedTransactionService.Instance;
    const event = new PlannedTransactionCreationRequestedEvent();
    service.Handle(event);
  });
});
