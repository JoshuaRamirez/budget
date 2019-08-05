import { assert } from "chai";
import "mocha";
import {DepositProjection} from "../../../source/Projections/DepositProjection";

describe("DepositProjection", () => {

  it("should import", () => {
    assert.exists(DepositProjection);
  });
  it("should instantiate", () => {
    const depositProjection = new DepositProjection();
    assert.exists(depositProjection);
  });
  it("should get", () => {
    DepositProjection.Get(1);
  });

});
