import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { ExpenseCreatedEvent } from "../Events/ExpenseCreatedEvent";
import { PlannedExpenseProjection } from "../Projections/PlannedExpenseProjection";

export class LinkExpenseToPlannedExpenseService implements ISubscriber<ExpenseCreatedEvent> {
  public static Instance = new LinkExpenseToPlannedExpenseService();
  public Process(event: ExpenseCreatedEvent): void {
    if (!event.PlannedExpenseId) {
      return;
    }
    const plannedExpenseProjection = PlannedExpenseProjection.Get(event.PlannedExpenseId);
    plannedExpenseProjection.ExpenseIds.push(event.PlannedExpenseId);
  }
  public Subscribe() {
    Publisher.Instance.Subscribe(ExpenseCreatedEvent, this);
  }
}
