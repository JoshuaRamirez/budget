import { assert } from "chai";
import "mocha";
import { BudgetProjection } from "../../../Source/Projections/BudgetProjection";

describe("BudgetProjection", () => {
  it("should import", () => {
    assert.exists(BudgetProjection);
  });
  it("should instantiate", () => {
    const accountProjection = new BudgetProjection();
    assert.exists(accountProjection);
  });
  it("should get", async () => {
    await BudgetProjection.Get(1);
  });
});
