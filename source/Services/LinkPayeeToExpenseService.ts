import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { ExpenseCreatedEvent } from "../Events/ExpenseCreatedEvent";
import { PayeeProjection } from "../Projections/PayeeProjection";
export class LinkPayeeToExpenseService implements ISubscriber<ExpenseCreatedEvent> {
  public static Instance: LinkPayeeToExpenseService = new LinkPayeeToExpenseService();
  private handles = [];
  public Process(event: ExpenseCreatedEvent): void {
    if (!event.ExpenseProjection.PayeeId) {
      return;
    }
    const payeeProjection = PayeeProjection.Get(event.ExpenseProjection.PayeeId);
    if (!payeeProjection) { // TODO: Evaluate below error message and association with saga
      throw new Error("The ProjectionStore returns no valid PayeeProjection associated with the Saga's PayeeId.");
    }
    payeeProjection.ExpenseIds.push(event.ExpenseProjection.Id);
  }
  public Subscribe() {
    const handle = Publisher.Instance.Subscribe(ExpenseCreatedEvent, this);
    this.handles.push(handle);
  }
  public UnSubscribe() {
    this.handles.forEach((handle) => {
      Publisher.Instance.UnSubscribe(ExpenseCreatedEvent, handle);
    });
  }
}
