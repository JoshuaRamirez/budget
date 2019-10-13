import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { PlannedExpenseProjection } from "../../../../Source/Projections/PlannedExpenseProjection";
import { Subscriptions } from "../../../../Source/Services/Core/Subscriptions";
import { LinkExpenseToPlannedExpenseService } from "../../../../Source/Services/Links/LinkExpenseToPlannedExpenseService";
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
    const plannedExpenseProjection = PlannedExpenseProjection.Get(expenseCreatedEvent.PlannedExpenseId);
    assert.equal(plannedExpenseProjection.ExpenseIds[0], expenseCreatedEvent.ExpenseId);
  });
});
