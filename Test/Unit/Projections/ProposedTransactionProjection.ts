import { assert } from "chai";
import "mocha";
import {ProposedTransactionProjection} from "../../../Source/Projections/ProposedTransactionProjection";

describe("ProposedTransactionProjection", () => {

  it("should import", () => {
    assert.exists(ProposedTransactionProjection);
  });
  it("should instantiate", () => {
    const proposedTransactionProjection = new ProposedTransactionProjection();
    assert.exists(proposedTransactionProjection);
  });
  it("should get", () => {
    ProposedTransactionProjection.Get(1);
  });

});
