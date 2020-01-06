import { assert } from "chai";
import "mocha";
import { LinkExpenseToPlannedExpenseService } from "../../../../Source/Services/Links/LinkExpenseToPlannedExpenseService";
import { NewExpenseCreatedEvent } from "../../../Helpers";

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
    const event = NewExpenseCreatedEvent();
    service.Receive(event);
  });
});
