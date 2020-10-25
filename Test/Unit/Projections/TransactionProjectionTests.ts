import { assert } from "chai";
import "mocha";
import { TransactionProjection } from "../../../Source/Projections/TransactionProjection";

describe("TransactionProjection", () => {
  it("should import", () => {
    assert.exists(TransactionProjection);
  });
  it("should instantiate", () => {
    const transactionProjection = new TransactionProjection();
    assert.exists(transactionProjection);
  });
  it("should get", async () => {
    await TransactionProjection.Get(1);
  });
});
