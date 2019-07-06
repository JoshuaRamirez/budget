import { assert } from "chai";
import "mocha";
import {PlannedExpenseProjection} from "../../../source/Projections/PlannedExpenseProjection";

describe("PlannedExpenseProjection", () => {

  it("should import", () => {
    assert.exists(PlannedExpenseProjection);
  });
  it("should instantiate", () => {
    const plannedExpenseProjection = new PlannedExpenseProjection();
    assert.exists(plannedExpenseProjection);
  });
  it("should get", () => {
    PlannedExpenseProjection.Get(1);
  });

});
