import { assert } from "chai";
import "mocha";
import { LinkExpenseToPayeeService } from "../../../../Source/Services/Links/LinkExpenseToPayeeService";
import { NewExpenseCreatedEvent } from "../../../Helpers";

describe("LinkExpenseToPayeeService", () => {
  it("should import", () => {
    assert.exists(LinkExpenseToPayeeService);
  });
  it("should instantiate with singleton", () => {
    const service = LinkExpenseToPayeeService.Instance;
    assert.exists(service);
  });
  it("should process", async () => {
    const service = LinkExpenseToPayeeService.Instance;
    const event = await NewExpenseCreatedEvent();
    await service.Receive(event);
  });
});
