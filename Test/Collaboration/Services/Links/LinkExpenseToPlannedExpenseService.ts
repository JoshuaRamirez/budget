import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { ExpenseProjection } from "../../../../Source/Projections/ExpenseProjection";
import { PlannedExpenseProjection } from "../../../../Source/Projections/PlannedExpenseProjection";
import { LinkExpenseToPlannedExpenseService } from "../../../../Source/Services/Links/LinkExpenseToPlannedExpenseService";
import { Subscriptions } from "../../../../Source/Subscriptions";
import { NewExpenseCreatedEvent } from "../../../Helpers";


describe("LinkExpenseToPlannedExpenseService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  it("should add the expense id to the planned expense link list", () => {
    const expenseCreatedEvent = NewExpenseCreatedEvent();
    expenseCreatedEvent.Publish();
    const expenseProjection = ExpenseProjection.Get(expenseCreatedEvent.ExpenseId);
    const plannedExpenseProjection = PlannedExpenseProjection.Get(expenseProjection.PlannedExpenseId);
    assert.equal(plannedExpenseProjection.ExpenseIds[0], expenseCreatedEvent.ExpenseId);
  });
});
