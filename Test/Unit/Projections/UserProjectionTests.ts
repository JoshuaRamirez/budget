import { assert } from "chai";
import "mocha";
import { UserProjection } from "../../../Source/Projections/UserProjection";

describe("UserProjection", () => {
  it("should import", () => {
    assert.exists(UserProjection);
  });
  it("should instantiate", () => {
    const userProjection = new UserProjection();
    assert.exists(userProjection);
  });
  it("should get", () => {
    UserProjection.Get(1);
  });
});
