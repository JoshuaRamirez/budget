import { Handler } from "../Core/Handler";
import { ExpenseCreatedEvent } from "../Events/ExpenseCreatedEvent";
import { ExpenseProjection } from "../Projections/ExpenseProjection";
import { PayeeProjection } from "../Projections/PayeeProjection";

export class LinkExpenseToPayeeService extends Handler<ExpenseCreatedEvent> {
  public static Instance: LinkExpenseToPayeeService = new LinkExpenseToPayeeService();
  private constructor() {
    super(ExpenseCreatedEvent);
  }
  public Process(event: ExpenseCreatedEvent): void {
    if (!event.ExpenseId) {
      return;
    }
    const expenseProjection = ExpenseProjection.Get(event.ExpenseId);
    if (!expenseProjection) {
      return;
    }
    if (!expenseProjection.PayeeId) {
      return;
    }
    const payeeProjection = PayeeProjection.Get(expenseProjection.PayeeId);
    if (!payeeProjection) { // TODO: Evaluate below error message and association with saga
      throw new Error("The ProjectionStore returns no valid PayeeProjection associated with the Saga's PayeeId.");
    }
    payeeProjection.ExpenseIds.push(expenseProjection.Id);
    payeeProjection.Update();
  }
}
