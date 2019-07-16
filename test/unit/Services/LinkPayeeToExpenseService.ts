import { assert } from "chai";
import "mocha";
import { ExpenseCreatedEvent } from "../../../source/Events/ExpenseCreatedEvent";
import {LinkPayeeToExpenseService} from "../../../source/Services/LinkPayeeToExpenseService";

describe("LinkPayeeToExpenseService", () => {
  it("should import", () => {
    assert.exists(LinkPayeeToExpenseService);
  });
  it("should instantiate with singleton", () => {
    const service = LinkPayeeToExpenseService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = LinkPayeeToExpenseService.Instance;
    const event = new ExpenseCreatedEvent();
    service.Process(event);
  });
});
