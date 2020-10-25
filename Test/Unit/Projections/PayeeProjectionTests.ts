import { assert } from "chai";
import "mocha";
import { PayeeProjection } from "../../../Source/Projections/PayeeProjection";

describe("PayeeProjection", () => {
  it("should import", () => {
    assert.exists(PayeeProjection);
  });
  it("should instantiate", () => {
    const payeeProjection = new PayeeProjection();
    assert.exists(payeeProjection);
  });
  it("should get", async () => {
    await PayeeProjection.Get(1);
  });
});
