import { assert } from "chai";
import "mocha";
import { CategoryRequestedEvent } from "../../../../Source/Events/Requested/Creation/CategoryRequestedEvent";
import { CreateCategoryService } from "../../../../Source/Services/Creates/CreateCategoryService";

describe("CreateCategoryService", () => {
  it("should import", () => {
    assert.exists(CreateCategoryService);
  });
  it("should instantiate with singleton", () => {
    const service = CreateCategoryService.Instance;
    assert.exists(service);
  });
  it("should process", async () => {
    const service = CreateCategoryService.Instance;
    const event = new CategoryRequestedEvent();
    await service.Receive(event);
  });
});