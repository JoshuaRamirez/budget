import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../source/Core/ProjectionStore";
import { ExpenseCreatedEvent } from "../../../source/Events/ExpenseCreatedEvent";
import { ExpenseProjection } from "../../../source/Projections/ExpenseProjection";
import { PlannedExpenseProjection } from "../../../source/Projections/PlannedExpenseProjection";
import { LinkPlannedExpenseToExpenseService } from "../../../source/Services/LinkPlannedExpenseToExpenseService";


describe("LinkPlannedExpenseToExpenseService", () => {
  it("should create projection", () => {
    const service = LinkPlannedExpenseToExpenseService.Instance;
    service.Subscribe();
    const plannedExpense = new PlannedExpenseProjection();
    plannedExpense.Project();
    const expenseProjection = new ExpenseProjection();
    expenseProjection.PlannedExpenseId = plannedExpense.Id;
    expenseProjection.Project();
    const event = new ExpenseCreatedEvent();
    event.ExpenseProjection = expenseProjection;
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(PlannedExpenseProjection);
    const projection = projections[0];
    assert.equal(projection.ExpenseIds[0], expenseProjection.Id);
  });
});
