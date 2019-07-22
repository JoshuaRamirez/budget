import { serializable } from "serializr";
import { Projection } from "../Core/Projection";
import { ProjectionStore } from "../Core/ProjectionStore";

export class ExpenseProjection extends Projection {
  public static Get(id: any): ExpenseProjection {
    return ProjectionStore.Instance.GetProjection(ExpenseProjection, id);
  }
  @serializable public Amount: number;
  @serializable public Description: string;
  @serializable public LedgerId: any;
  @serializable public TransactionId: any;
  @serializable public PayeeId: any;
  @serializable public Category: string;
  @serializable public PlannedExpenseId: any;
  constructor() {
    super(ExpenseProjection.name);
  }
  public Project(): void {
    ProjectionStore.Instance.Save(this);
  }
  public Update(): void {
    ProjectionStore.Instance.Update(ExpenseProjection, this);
  }
}
