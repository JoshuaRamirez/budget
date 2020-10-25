import { assert } from "chai";
import "mocha";
import { PlannedTransactionProjection } from "../../../Source/Projections/PlannedTransactionProjection";

describe("PlannedTransactionProjection", () => {
  it("should import", () => {
    assert.exists(PlannedTransactionProjection);
  });
  it("should instantiate", () => {
    const plannedTransactionProjection = new PlannedTransactionProjection();
    assert.exists(plannedTransactionProjection);
  });
  it("should get", async () => {
    await PlannedTransactionProjection.Get(1);
  });
});
