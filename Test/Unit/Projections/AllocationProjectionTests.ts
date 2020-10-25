import { assert } from "chai";
import "mocha";
import { AllocationProjection } from "../../../Source/Projections/AllocationProjection";

describe("AllocationProjection", () => {
  it("should import", () => {
    assert.exists(AllocationProjection);
  });
  it("should instantiate", () => {
    const allocationProjection = new AllocationProjection();
    assert.exists(allocationProjection);
  });
  it("should get", async () => {
    await AllocationProjection.Get(1);
  });
});
