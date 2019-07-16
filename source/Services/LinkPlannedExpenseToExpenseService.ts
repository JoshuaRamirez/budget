import { Handler } from "../Core/Handler";
import { ExpenseCreatedEvent } from "../Events/ExpenseCreatedEvent";
import { PlannedExpenseProjection } from "../Projections/PlannedExpenseProjection";

export class LinkPlannedExpenseToExpenseService extends Handler<ExpenseCreatedEvent> {
  public static Instance = new LinkPlannedExpenseToExpenseService();
  private constructor() {
    super(ExpenseCreatedEvent);
  }
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
}
