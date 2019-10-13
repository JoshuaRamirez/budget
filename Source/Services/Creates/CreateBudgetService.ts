import { BudgetRequestedEvent } from "../../Events/BudgetRequestedEvent";
import { BudgetProjection } from "../../Projections/BudgetProjection";
import { Handler } from "../Core/Handler";

export class CreateBudgetService extends Handler<BudgetRequestedEvent> {
  public static Instance = new CreateBudgetService();
  private constructor() {
    super(BudgetRequestedEvent);
  }
  public Handle(event: BudgetRequestedEvent) {
    const budgetProjection = new BudgetProjection();
    budgetProjection.BudgetName = event.BudgetName;
    budgetProjection.Type = event.Type;
    budgetProjection.Project();
  }
}
