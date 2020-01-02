import { assert } from "chai";
import "mocha";
import { BudgetRequestedEvent } from "../../../../Source/Events/Requested/Creation/BudgetRequestedEvent";
import {CreateBudgetService} from "../../../../Source/Services/Creates/CreateBudgetService";

describe("CreateBudgetService", () => {
  it("should import", () => {
    assert.exists(CreateBudgetService);
  });
  it("should instantiate with singleton", () => {
    const service = CreateBudgetService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = CreateBudgetService.Instance;
    const event = new BudgetRequestedEvent();
    service.Receive(event);
  });
});
