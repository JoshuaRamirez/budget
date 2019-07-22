import { Handler } from "../Core/Handler";
import { ExpenseCreatedEvent } from "../Events/ExpenseCreatedEvent";
import { ExpenseProjection } from "../Projections/ExpenseProjection";
import { PlannedExpenseProjection } from "../Projections/PlannedExpenseProjection";

export class LinkPlannedExpenseToExpenseService extends Handler<ExpenseCreatedEvent> {
  public static Instance = new LinkPlannedExpenseToExpenseService();
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
    if (!expenseProjection.PlannedExpenseId) {
      return;
    }
    const plannedExpenseProjection = PlannedExpenseProjection.Get(expenseProjection.PlannedExpenseId);
    plannedExpenseProjection.ExpenseIds.push(expenseProjection.Id);
    plannedExpenseProjection.Update();
  }
}
