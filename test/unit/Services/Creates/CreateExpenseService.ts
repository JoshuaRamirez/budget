import { assert } from "chai";
import "mocha";
import { ExpenseRequestedEvent } from "../../../../source/Events/ExpenseRequestedEvent";
import {CreateExpenseService} from "../../../../source/Services/Creates/CreateExpenseService";

describe("CreateExpenseService", () => {
  it("should import", () => {
    assert.exists(CreateExpenseService);
  });
  it("should instantiate with singleton", () => {
    const service = CreateExpenseService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = CreateExpenseService.Instance;
    const event = new ExpenseRequestedEvent();
    service.Handle(event);
  });
});
