import { assert } from "chai";
import "mocha";
import { ExpenseCreatedEvent } from "../../../source/Events/ExpenseCreatedEvent";
import {LinkPlannedExpenseToExpenseService} from "../../../source/Services/LinkPlannedExpenseToExpenseService";

describe("LinkPlannedExpenseToExpenseService", () => {
  it("should import", () => {
    assert.exists(LinkPlannedExpenseToExpenseService);
  });
  it("should instantiate with singleton", () => {
    const service = LinkPlannedExpenseToExpenseService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = LinkPlannedExpenseToExpenseService.Instance;
    const event = new ExpenseCreatedEvent();
    service.Process(event);
  });
});
