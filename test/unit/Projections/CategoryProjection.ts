import { assert } from "chai";
import "mocha";
import {CategoryProjection} from "../../../source/Projections/CategoryProjection";

describe("CategoryProjection", () => {

  it("should import", () => {
    assert.exists(CategoryProjection);
  });
  it("should instantiate", () => {
    const allocationProjection = new CategoryProjection();
    assert.exists(allocationProjection);
  });
  it("should get", () => {
    CategoryProjection.Get(1);
  });

});
