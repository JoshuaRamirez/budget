import { assert } from "chai";
import "mocha";
import {CreatePayeeService} from "../../../source/Services/CreatePayeeService";

describe("CreatePayeeService", () => {
  it("should import", () => {
    assert.exists(CreatePayeeService);
  });
  it("should instantiate", () => {
    const service = new CreatePayeeService();
    assert.exists(service);
  });
  it("should instantiate with singleton", () => {
    const service = CreatePayeeService.Instance;
    assert.exists(service);
  });
});
