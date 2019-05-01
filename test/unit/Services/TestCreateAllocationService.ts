import { assert } from "chai";
import "mocha";
import {CreateAllocationService} from "../../../source/Services/CreateAllocationService";

describe("CreateAllocationService", () => {

  it("should import", () => {
    assert.exists(CreateAllocationService);
  });
  it("should instantiate", () => {
    const createAllocationService = new CreateAllocationService();
    assert.exists(createAllocationService);
  });

});
