import { Handler } from "../../Core/Handler";
import { BudgetRequestedEvent } from "../../Events/BudgetRequestedEvent";
import { BudgetProjection } from "../../Projections/BudgetProjection";

export class CreateBudgetService extends Handler<BudgetRequestedEvent> {
  public static Instance = new CreateBudgetService();
  private constructor() {
    super(BudgetRequestedEvent);
  }
  public Process(event: BudgetRequestedEvent) {
    const accountProjection = new BudgetProjection();
    accountProjection.BudgetName = event.BudgetName;
    accountProjection.Type = event.Type;
    accountProjection.Project();
  }
}
