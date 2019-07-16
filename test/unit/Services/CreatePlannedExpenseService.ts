import { assert } from "chai";
import "mocha";
import {CreatePlannedExpenseService} from "../../../source/Services/CreatePlannedExpenseService";

describe("CreatePlannedExpenseService", () => {
  it("should import", () => {
    assert.exists(CreatePlannedExpenseService);
  });
  it("should instantiate with singleton", () => {
    const service = CreatePlannedExpenseService.Instance;
    assert.exists(service);
  });
});
