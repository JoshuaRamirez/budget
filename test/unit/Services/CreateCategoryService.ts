import { assert } from "chai";
import "mocha";
import { CategoryRequestedEvent } from "../../../source/Events/CategoryRequestedEvent";
import {CreateCategoryService} from "../../../source/Services/Creates/CreateCategoryService";

describe("CreateCategoryService", () => {
  it("should import", () => {
    assert.exists(CreateCategoryService);
  });
  it("should instantiate with singleton", () => {
    const service = CreateCategoryService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = CreateCategoryService.Instance;
    const event = new CategoryRequestedEvent();
    service.Process(event);
  });
});
