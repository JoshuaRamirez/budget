import { assert } from "chai";
import "mocha";
import {LinkPlannedExpenseToExpenseService} from "../../../source/Services/LinkPlannedExpenseToExpenseService";

describe("LinkPlannedExpenseToExpenseService", () => {
  it("should import", () => {
    assert.exists(LinkPlannedExpenseToExpenseService);
  });
  it("should instantiate with singleton", () => {
    const service = new LinkPlannedExpenseToExpenseService();
    assert.exists(service);
  });
});
