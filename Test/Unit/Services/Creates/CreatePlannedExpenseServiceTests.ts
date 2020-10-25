import { assert } from "chai";
import "mocha";
import { PlannedExpenseRequestedEvent } from "../../../../Source/Events/Requested/Creation/PlannedExpenseRequestedEvent";
import { CreatePlannedExpenseService } from "../../../../Source/Services/Creates/CreatePlannedExpenseService";

describe("CreatePlannedExpenseService", () => {
  it("should import", () => {
    assert.exists(CreatePlannedExpenseService);
  });
  it("should instantiate with singleton", () => {
    const service = CreatePlannedExpenseService.Instance;
    assert.exists(service);
  });
  it("should process", async () => {
    const service = CreatePlannedExpenseService.Instance;
    const event = new PlannedExpenseRequestedEvent();
    await service.Receive(event);
  });
});
