import { assert } from "chai";
import "mocha";
import {PayerProjection} from "../../../source/Projections/PayerProjection";

describe("PayerProjection", () => {

  it("should import", () => {
    assert.exists(PayerProjection);
  });
  it("should instantiate", () => {
    const payerProjection = new PayerProjection();
    assert.exists(payerProjection);
  });
  it("should get", () => {
    PayerProjection.Get(1);
  });

});
