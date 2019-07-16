import { assert } from "chai";
import "mocha";
import {LinkPayeeToExpenseService} from "../../../source/Services/LinkPayeeToExpenseService";

describe("LinkPayeeToExpenseService", () => {
  it("should import", () => {
    assert.exists(LinkPayeeToExpenseService);
  });
  it("should instantiate with singleton", () => {
    const service = LinkPayeeToExpenseService.Instance;
    assert.exists(service);
  });
});
