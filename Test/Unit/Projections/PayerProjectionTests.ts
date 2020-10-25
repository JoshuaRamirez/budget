import { assert } from "chai";
import "mocha";
import { PayerProjection } from "../../../Source/Projections/PayerProjection";

describe("PayerProjection", () => {
  it("should import", () => {
    assert.exists(PayerProjection);
  });
  it("should instantiate", () => {
    const payerProjection = new PayerProjection();
    assert.exists(payerProjection);
  });
  it("should get", async () => {
    await PayerProjection.Get(1);
  });
});