import { assert } from "chai";
import "mocha";
import { ExpenseRequestedEvent } from "../../../../Source/Events/Requested/Creation/ExpenseRequestedEvent";
import {CreateExpenseService} from "../../../../Source/Services/Creates/CreateExpenseService";

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
    service.Receive(event);
  });
});
