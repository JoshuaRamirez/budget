import { serializable } from "serializr";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class ExpenseProjection extends Projection {
  public static async Get(id: any): Promise<ExpenseProjection> {
    const projection = ProjectionStore.Instance.GetProjection<ExpenseProjection>(ExpenseProjection, id);
    return new Promise((resolve, reject) => resolve(projection));
  }

  // Foreign Keys
  @serializable public CategoryId: any;
  @serializable public LedgerId: any;
  @serializable public PayeeId: any;
  @serializable public PlannedExpenseId: any;
  @serializable public TransactionId: any;

  // Fields
  @serializable public Amount: number;
  @serializable public Description: string;

  constructor() {
    super(ExpenseProjection.name);
  }
  public async Project(): Promise<void> {
    await ProjectionStore.Instance.Save(this);
    return new Promise((resolve, reject) => resolve());
  }
  public async Update(): Promise<void> {
    await ProjectionStore.Instance.Update(ExpenseProjection, this);
    return new Promise((resolve, reject) => resolve());
  }
}
