import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../source/Core/ProjectionStore";
import { BudgetRequestedEvent } from "../../../../source/Events/BudgetRequestedEvent";
import { BudgetProjection } from "../../../../source/Projections/BudgetProjection";
import { CreateBudgetService } from "../../../../source/Services/Creates/CreateBudgetService";


describe("CreateBudgetService", () => {
  it("should create projection", () => {
    const service = CreateBudgetService.Instance;
    service.Subscribe();
    const event = new BudgetRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(BudgetProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});
