import { assert } from "chai";
import "mocha";
import { ExpenseCreatedEvent } from "../../../source/Events/ExpenseCreatedEvent";
import {LinkExpenseToPlannedExpenseService} from "../../../source/Services/Links/LinkExpenseToPlannedExpenseService";

describe("LinkExpenseToPlannedExpenseService", () => {
  it("should import", () => {
    assert.exists(LinkExpenseToPlannedExpenseService);
  });
  it("should instantiate with singleton", () => {
    const service = LinkExpenseToPlannedExpenseService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = LinkExpenseToPlannedExpenseService.Instance;
    const event = new ExpenseCreatedEvent();
    service.Process(event);
  });
});
