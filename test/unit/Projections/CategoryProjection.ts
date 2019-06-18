import { assert } from "chai";
import "mocha";
import {AllocationProjection} from "../../../source/Projections/AllocationProjection";

describe("CreateAllocationProjection", () => {

  it("should import", () => {
    assert.exists(AllocationProjection);
  });
  it("should instantiate", () => {
    const createAllocationProjection = new AllocationProjection();
    assert.exists(createAllocationProjection);
  });

});
