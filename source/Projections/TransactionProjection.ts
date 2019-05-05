import { Projection } from "../Core/Projection";
import { ProjectionStore } from "../Core/ProjectionStore";

export class TransactionProjection extends Projection {
  public static Get(id: any): TransactionProjection {
    return ProjectionStore.Instance.GetProjection(TransactionProjection, id);
  }
  public Amount: number;
  public Destination: any;
  public LedgerId: any;
  public Source: any;
  public Type: string;
  constructor() {
    super(TransactionProjection.name);
  }
}
