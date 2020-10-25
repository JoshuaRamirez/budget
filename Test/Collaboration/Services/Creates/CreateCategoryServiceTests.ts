import { assert } from "chai";
import "mocha";
import { CategoryRequestedEvent } from "../../../../Source/Events/Requested/Creation/CategoryRequestedEvent";
import { CategoryProjection } from "../../../../Source/Projections/CategoryProjection";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { CreateCategoryService } from "../../../../Source/Services/Creates/CreateCategoryService";
import { System } from "../../../../Source/System/System";

describe("CreateCategoryService", () => {
  beforeEach(async () => {
    await System.Shutdown();
    await System.Startup();
  });
  it("should create projection", async () => {
    const event = new CategoryRequestedEvent();
    await event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = await projectionStore.GetProjections(CategoryProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
