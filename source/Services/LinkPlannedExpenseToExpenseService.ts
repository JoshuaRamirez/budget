import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { ExpenseCreatedEvent } from "../Events/ExpenseCreatedEvent";
import { PlannedExpenseProjection } from "../Projections/PlannedExpenseProjection";

export class LinkPlannedExpenseToExpenseService implements ISubscriber<ExpenseCreatedEvent> {
  public static Instance = new LinkPlannedExpenseToExpenseService();
  private handles = [];
  public Process(event: ExpenseCreatedEvent): void {
    if (!event.ExpenseProjection) {
      return;
    }
    if (!event.ExpenseProjection.PlannedExpenseId) {
      return;
    }
    const plannedExpenseProjection = PlannedExpenseProjection.Get(event.ExpenseProjection.PlannedExpenseId);
    plannedExpenseProjection.ExpenseIds.push(event.ExpenseProjection.Id);
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
