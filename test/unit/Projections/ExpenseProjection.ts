import { assert } from "chai";
import "mocha";
import {ExpenseProjection} from "../../../source/Projections/ExpenseProjection";

describe("ExpenseProjection", () => {

  it("should import", () => {
    assert.exists(ExpenseProjection);
  });
  it("should instantiate", () => {
    const expenseProjection = new ExpenseProjection();
    assert.exists(expenseProjection);
  });
  it("should get", () => {
    ExpenseProjection.Get(1);
  });

});
