import { assert } from "chai";
import "mocha";
import { CategoryRequestedEvent } from "../../../../Source/Events/CategoryRequestedEvent";
import { CategoryProjection } from "../../../../Source/Projections/CategoryProjection";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { Subscriptions } from "../../../../Source/Services/Core/Subscriptions";
import { CreateCategoryService } from "../../../../Source/Services/Creates/CreateCategoryService";


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
