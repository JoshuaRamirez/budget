import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { ExpenseProjection } from "../../../../Source/Projections/ExpenseProjection";
import { PayeeProjection } from "../../../../Source/Projections/PayeeProjection";
import { LinkExpenseToPayeeService } from "../../../../Source/Services/Links/LinkExpenseToPayeeService";
import { Subscriptions } from "../../../../Source/Subscriptions";
import { NewExpenseCreatedEvent } from "../../../Helpers";

describe("LinkExpenseToPayeeService", () => {
  beforeEach(async () => {
    await Subscriptions.Release();
    await Subscriptions.Create();
    await ProjectionStore.Instance.ClearAll();
  });
  it("should add the expense id to the payee link list", async () => {
    const expenseCreatedEvent = await NewExpenseCreatedEvent();
    await expenseCreatedEvent.Publish();
    const expenseProjection = await ExpenseProjection.Get(expenseCreatedEvent.ExpenseId);
    const payeeProjection = await PayeeProjection.Get(expenseProjection.PayeeId);
    assert.equal(payeeProjection.ExpenseIds[0], expenseCreatedEvent.ExpenseId);
  });
});
