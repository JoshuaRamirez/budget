import { BudgetRequestedEvent } from "../../Events/Requested/Creation/BudgetRequestedEvent";
import { BudgetProjection } from "../../Projections/BudgetProjection";
import { Receiver } from "../Core/Receiver";

export class CreateBudgetService extends Receiver<BudgetRequestedEvent> {
  public static Instance = new CreateBudgetService();
  private constructor() {
    super(BudgetRequestedEvent);
  }
  public Receive(event: BudgetRequestedEvent) {
    const budgetProjection = new BudgetProjection();
    budgetProjection.BudgetName = event.BudgetName;
    budgetProjection.Type = event.Type;
    budgetProjection.Project();
  }
}
