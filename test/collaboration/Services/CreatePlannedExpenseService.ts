import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../source/Core/ProjectionStore";
import { PlannedExpenseRequestedEvent } from "../../../source/Events/PlannedExpenseRequestedEvent";
import { PlannedExpenseProjection } from "../../../source/Projections/PlannedExpenseProjection";
import { CreatePlannedExpenseService } from "../../../source/Services/CreatePlannedExpenseService";


describe("CreatePlannedExpenseService", () => {
  it("should create projection", () => {
    const service = CreatePlannedExpenseService.Instance;
    service.Subscribe();
    const event = new PlannedExpenseRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(PlannedExpenseProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
