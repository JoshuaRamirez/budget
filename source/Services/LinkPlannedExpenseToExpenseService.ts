import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { ExpenseCreatedEvent } from "../Events/ExpenseCreatedEvent";
import { PlannedExpenseProjection } from "../Projections/PlannedExpenseProjection";

export class LinkPlannedExpenseToExpenseService implements ISubscriber<ExpenseCreatedEvent> {
  public static Instance = new LinkPlannedExpenseToExpenseService();
  public Process(event: ExpenseCreatedEvent): void {
    if (!event.ExpenseProjection.PlannedExpenseId) {
      return;
    }
    const plannedExpenseProjection = PlannedExpenseProjection.Get(event.ExpenseProjection.PlannedExpenseId);
    plannedExpenseProjection.ExpenseIds.push(event.ExpenseProjection.PlannedExpenseId);
  }
  public Subscribe() {
    Publisher.Instance.Subscribe(ExpenseCreatedEvent, this);
  }
}
