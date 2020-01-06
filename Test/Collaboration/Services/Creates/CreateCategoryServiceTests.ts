import { assert } from "chai";
import "mocha";
import { CategoryRequestedEvent } from "../../../../Source/Events/Requested/Creation/CategoryRequestedEvent";
import { CategoryProjection } from "../../../../Source/Projections/CategoryProjection";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { CreateCategoryService } from "../../../../Source/Services/Creates/CreateCategoryService";
import { System } from "../../../../Source/System/System";

describe("CreateCategoryService", () => {
  beforeEach(() => {
    System.Shutdown();
    System.Startup();
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
