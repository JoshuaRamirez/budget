import { assert } from "chai";
import "mocha";
import { PlannedExpenseRequestedEvent } from "../../../source/Events/PlannedExpenseRequestedEvent";
import {CreatePlannedExpenseService} from "../../../source/Services/Creates/CreatePlannedExpenseService";

describe("CreatePlannedExpenseService", () => {
  it("should import", () => {
    assert.exists(CreatePlannedExpenseService);
  });
  it("should instantiate with singleton", () => {
    const service = CreatePlannedExpenseService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = CreatePlannedExpenseService.Instance;
    const event = new PlannedExpenseRequestedEvent();
    service.Process(event);
  });
});
