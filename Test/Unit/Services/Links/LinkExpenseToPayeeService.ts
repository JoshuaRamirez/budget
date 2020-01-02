import { assert } from "chai";
import "mocha";
import {LinkExpenseToPayeeService} from "../../../../Source/Services/Links/LinkExpenseToPayeeService";
import { NewExpenseCreatedEvent } from "../../../Helpers";

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
    const event = NewExpenseCreatedEvent();
    service.Receive(event);
  });
});
