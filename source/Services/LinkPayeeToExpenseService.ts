import { Handler } from "../Core/Handler";
import { ExpenseCreatedEvent } from "../Events/ExpenseCreatedEvent";
import { PayeeProjection } from "../Projections/PayeeProjection";

export class LinkPayeeToExpenseService extends Handler<ExpenseCreatedEvent> {
  public static Instance: LinkPayeeToExpenseService = new LinkPayeeToExpenseService();
  private constructor() {
    super(ExpenseCreatedEvent);
  }
  public Process(event: ExpenseCreatedEvent): void {
    if (!event.ExpenseProjection) {
      return;
    }
    if (!event.ExpenseProjection.PayeeId) {
      return;
    }
    const payeeProjection = PayeeProjection.Get(event.ExpenseProjection.PayeeId);
    if (!payeeProjection) { // TODO: Evaluate below error message and association with saga
      throw new Error("The ProjectionStore returns no valid PayeeProjection associated with the Saga's PayeeId.");
    }
    payeeProjection.ExpenseIds.push(event.ExpenseProjection.Id);
  }
}
