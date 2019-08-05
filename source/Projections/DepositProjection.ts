import { serializable } from "serializr";
import { Projection } from "../Core/Projection";
import { ProjectionStore } from "../Core/ProjectionStore";

export class DepositProjection extends Projection {
  public static Get(id: any): DepositProjection {
    return ProjectionStore.Instance.GetProjection(DepositProjection, id);
  }
  @serializable public Amount: number;
  @serializable public CategoryId: string;
  @serializable public Description: string;
  @serializable public LedgerId: any;
  @serializable public PayerId: any;
  @serializable public PlannedDepositId: any;
  @serializable public TransactionId: any;
  constructor() {
    super(DepositProjection.name);
  }
  public Project(): void {
    ProjectionStore.Instance.Save(this);
  }
  public Update(): void {
    ProjectionStore.Instance.Update(DepositProjection, this);
  }
}