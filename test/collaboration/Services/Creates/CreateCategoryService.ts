import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../source/Core/ProjectionStore";
import { CategoryRequestedEvent } from "../../../../source/Events/CategoryRequestedEvent";
import { CategoryProjection } from "../../../../source/Projections/CategoryProjection";
import { CreateCategoryService } from "../../../../source/Services/Creates/CreateCategoryService";


describe("CreateCategoryService", () => {
  it("should create projection", () => {
    const service = CreateCategoryService.Instance;
    service.Subscribe();
    const event = new CategoryRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(CategoryProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
