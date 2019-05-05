import { Projection } from "../Core/Projection";
import { ProjectionStore } from "../Core/ProjectionStore";

export class ExpenseProjection extends Projection {
  public static Get(PayeeId: any): ExpenseProjection {
    return ProjectionStore.Instance.GetProjection(ExpenseProjection, PayeeId);
  }
  public Amount: number;
  public Description: string;
  public LedgerId: any;
  public TransactionId: any;
  public PayeeId: any;
  public Category: string;
  constructor() {
    super(ExpenseProjection.name);
  }
}
