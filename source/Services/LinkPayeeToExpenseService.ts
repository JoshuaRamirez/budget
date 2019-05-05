import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { ExpenseCreatedEvent } from "../Events/ExpenseCreatedEvent";
import { PayeeProjection } from "../Projections/PayeeProjection";

export class LinkPayeeToExpenseService implements ISubscriber<ExpenseCreatedEvent> {
  public Process(event: ExpenseCreatedEvent): void {
    if (!event.ExpenseProjection.PayeeId) {
      return;
    }
    const payeeProjection = PayeeProjection.Get(event.ExpenseProjection.PayeeId);
    if (!payeeProjection) {
      throw new Error("The ProjectionStore returns no valid PayeeProjection associated with the Saga's PayeeId.");
    }
    payeeProjection.ExpenseIds.push(event.ExpenseProjection.Id);
  }
  public Subscribe() {
    Publisher.Instance.Subscribe(ExpenseCreatedEvent, this);
  }
}
