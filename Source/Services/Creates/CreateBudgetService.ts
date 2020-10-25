import { BudgetRequestedEvent } from "../../Events/Requested/Creation/BudgetRequestedEvent";
import { BudgetProjection } from "../../Projections/BudgetProjection";
import { Receiver } from "../Core/Receiver";

export class CreateBudgetService extends Receiver<BudgetRequestedEvent> {
  public static Instance = new CreateBudgetService();
  private constructor() {
    super(BudgetRequestedEvent);
  }
  public async Receive(event: BudgetRequestedEvent): Promise<void> {
    const budgetProjection = new BudgetProjection();
    budgetProjection.BudgetName = event.BudgetName;
    budgetProjection.Type = event.Type;
    await budgetProjection.Project();
    return new Promise((resolve, reject) => resolve());
  }
}
