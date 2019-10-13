import { assert } from "chai";
import "mocha";
import { CategoryRequestedEvent } from "../../../../Source/Events/CategoryRequestedEvent";
import {CreateCategoryService} from "../../../../Source/Services/Creates/CreateCategoryService";

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
    service.Handle(event);
  });
});
