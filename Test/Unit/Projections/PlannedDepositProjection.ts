import { assert } from "chai";
import "mocha";
import {PlannedDepositProjection} from "../../../Source/Projections/PlannedDepositProjection";

describe("PlannedDepositProjection", () => {

  it("should import", () => {
    assert.exists(PlannedDepositProjection);
  });
  it("should instantiate", () => {
    const plannedDepositProjection = new PlannedDepositProjection();
    assert.exists(plannedDepositProjection);
  });
  it("should get", () => {
    PlannedDepositProjection.Get(1);
  });

});
