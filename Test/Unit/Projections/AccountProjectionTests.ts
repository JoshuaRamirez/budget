import { assert } from "chai";
import "mocha";
import { AccountProjection } from "../../../Source/Projections/AccountProjection";

describe("AccountProjection", () => {
  it("should import", () => {
    assert.exists(AccountProjection);
  });
  it("should instantiate", () => {
    const accountProjection = new AccountProjection();
    assert.exists(accountProjection);
  });
  it("should get", async () => {
    await AccountProjection.Get(1);
  });
});
