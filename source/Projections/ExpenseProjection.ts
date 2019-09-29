import { serializable } from "serializr";
import { Projection } from "../Core/Projection";
import { ProjectionStore } from "../Core/ProjectionStore";

export class ExpenseProjection extends Projection {
  public static Get(id: any): ExpenseProjection {
    return ProjectionStore.Instance.GetProjection(ExpenseProjection, id);
  }

  // Foreign Keys
  @serializable public LedgerId: any;
  @serializable public PayeeId: any;
  @serializable public PlannedExpenseId: any;
  @serializable public TransactionId: any;

  // Fields
  @serializable public Amount: number;
  @serializable public Category: string;
  @serializable public Description: string;

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
