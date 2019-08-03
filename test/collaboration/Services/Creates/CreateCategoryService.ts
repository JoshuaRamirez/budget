import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../source/Core/ProjectionStore";
import { Subscriptions } from "../../../../source/Core/Subscriptions";
import { CategoryRequestedEvent } from "../../../../source/Events/CategoryRequestedEvent";
import { CategoryProjection } from "../../../../source/Projections/CategoryProjection";
import { CreateCategoryService } from "../../../../source/Services/Creates/CreateCategoryService";


describe("CreateCategoryService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  it("should create projection", () => {
    const event = new CategoryRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(CategoryProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
