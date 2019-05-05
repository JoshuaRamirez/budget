import { Projection } from "../Core/Projection";
import { ProjectionStore } from "../Core/ProjectionStore";

export class ExpenseProjection extends Projection {
  public static Get(id: any): ExpenseProjection {
    return ProjectionStore.Instance.GetProjection(ExpenseProjection, id);
  }
  public Amount: number;
  public Description: string;
  public LedgerId: any;
  public TransactionId: any;
  public PayeeId: any;
  public Category: string;
  public PlannedExpenseId: any;
  constructor() {
    super(ExpenseProjection.name);
  }
}
