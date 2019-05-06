import { Projection } from "../Core/Projection";
import { ProjectionStore } from "../Core/ProjectionStore";

export class PayeeProjection extends Projection {
  public static Get(id: any): PayeeProjection {
    return ProjectionStore.Instance.GetProjection(PayeeProjection, id);
  }
  public Description: string;
  public ExpenseIds: any[];
  public PayeeName: string;
  public Type: string;
  constructor() {
    super(PayeeProjection.name);
    this.ExpenseIds = [];
  }
}
