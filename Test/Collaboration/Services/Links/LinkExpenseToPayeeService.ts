import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { PayeeProjection } from "../../../../Source/Projections/PayeeProjection";
import { Subscriptions } from "../../../../Source/Services/Core/Subscriptions";
import { LinkExpenseToPayeeService } from "../../../../Source/Services/Links/LinkExpenseToPayeeService";
import { NewExpenseCreatedEvent } from "../../../Helpers";


describe("LinkExpenseToPayeeService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  it("should add the expense id to the payee link list", () => {
    const expenseCreatedEvent = NewExpenseCreatedEvent();
    expenseCreatedEvent.Publish();
    const projection = PayeeProjection.Get(expenseCreatedEvent.PayeeId);
    assert.equal(projection.ExpenseIds[0], expenseCreatedEvent.ExpenseId);
  });
});
