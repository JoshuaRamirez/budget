import { assert } from "chai";
import "mocha";
import { LedgerProjection } from "../../../Source/Projections/LedgerProjection";

describe("LedgerProjection", () => {
  it("should import", () => {
    assert.exists(LedgerProjection);
  });
  it("should instantiate", () => {
    const ledgerProjection = new LedgerProjection();
    assert.exists(ledgerProjection);
  });
  it("should get", async () => {
    await LedgerProjection.Get(1);
  });
});
