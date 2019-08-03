import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../source/Core/ProjectionStore";
import { Subscriptions } from "../../../../source/Core/Subscriptions";
import { ExpenseCreatedEvent } from "../../../../source/Events/ExpenseCreatedEvent";
import { ExpenseProjection } from "../../../../source/Projections/ExpenseProjection";
import { PayeeProjection } from "../../../../source/Projections/PayeeProjection";
import { LinkExpenseToPayeeService } from "../../../../source/Services/Links/LinkExpenseToPayeeService";


describe("LinkExpenseToPayeeService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  it("should add the expense id to the payee link list", () => {
    const payeeProjection = new PayeeProjection();
    payeeProjection.Project();
    const expenseProjection = new ExpenseProjection();
    expenseProjection.PayeeId = payeeProjection.Id;
    expenseProjection.Project();
    const event = new ExpenseCreatedEvent();
    event.ExpenseId = expenseProjection.Id;
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(PayeeProjection);
    const projection = projections[0];
    assert.equal(projection.ExpenseIds[0], expenseProjection.Id);
  });
});
