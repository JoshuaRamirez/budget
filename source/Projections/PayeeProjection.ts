import { Projection } from "../Core/Projection";
import { ProjectionStore } from "../Core/ProjectionStore";

export class PayeeProjection extends Projection {
  public static Get(PayeeId: any): PayeeProjection {
    return ProjectionStore.Instance.GetProjection(PayeeProjection, PayeeId);
  }
  public Description: string;
  public ExpenseIds: any[];
  public Name: string;
  public Type: string;
  constructor() {
    super(PayeeProjection.name);
    this.ExpenseIds = [];
  }
}
