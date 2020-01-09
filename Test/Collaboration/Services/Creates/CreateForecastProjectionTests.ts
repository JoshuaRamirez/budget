import { assert } from "chai";
import "mocha";
import { ForecastRequestedEvent } from "../../../../Source/Events/Requested/Creation/ForecastRequestedEvent";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { ForecastProjection } from "../../../../Source/Projections/ForecastProjection";
import { System } from "../../../../Source/System/System";

describe("CreateForecastService", () => {
  beforeEach(() => {
    System.Shutdown();
    System.Startup();
  });
  it("should create projection", () => {
    const event = new ForecastRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(ForecastProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
