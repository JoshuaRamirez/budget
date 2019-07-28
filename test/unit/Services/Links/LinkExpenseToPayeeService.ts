import { assert } from "chai";
import "mocha";
import { ExpenseCreatedEvent } from "../../../../source/Events/ExpenseCreatedEvent";
import {LinkExpenseToPayeeService} from "../../../../source/Services/Links/LinkExpenseToPayeeService";

describe("LinkExpenseToPayeeService", () => {
  it("should import", () => {
    assert.exists(LinkExpenseToPayeeService);
  });
  it("should instantiate with singleton", () => {
    const service = LinkExpenseToPayeeService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = LinkExpenseToPayeeService.Instance;
    const event = new ExpenseCreatedEvent();
    service.Process(event);
  });
});
