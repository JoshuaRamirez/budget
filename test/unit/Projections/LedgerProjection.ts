import { assert } from "chai";
import "mocha";
import {LedgerProjection} from "../../../source/Projections/LedgerProjection";

describe("LedgerProjection", () => {

  it("should import", () => {
    assert.exists(LedgerProjection);
  });
  it("should instantiate", () => {
    const ledgerProjection = new LedgerProjection();
    assert.exists(ledgerProjection);
  });
  it("should get", () => {
    LedgerProjection.Get(1);
  });

});
