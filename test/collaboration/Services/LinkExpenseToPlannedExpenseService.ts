import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../source/Core/ProjectionStore";
import { ExpenseCreatedEvent } from "../../../source/Events/ExpenseCreatedEvent";
import { ExpenseProjection } from "../../../source/Projections/ExpenseProjection";
import { PlannedExpenseProjection } from "../../../source/Projections/PlannedExpenseProjection";
import { LinkExpenseToPlannedExpenseService } from "../../../source/Services/LinkExpenseToPlannedExpenseService";


describe("LinkExpenseToPlannedExpenseService", () => {
  it("should create projection", () => {
    const service = LinkExpenseToPlannedExpenseService.Instance;
    service.Subscribe();
    const plannedExpense = new PlannedExpenseProjection();
    plannedExpense.Project();
    const expenseProjection = new ExpenseProjection();
    expenseProjection.PlannedExpenseId = plannedExpense.Id;
    expenseProjection.Project();
    const event = new ExpenseCreatedEvent();
    event.ExpenseId = expenseProjection.Id;
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(PlannedExpenseProjection);
    const projection = projections[0];
    assert.equal(projection.ExpenseIds[0], expenseProjection.Id);
  });
});
