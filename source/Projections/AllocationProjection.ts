import { Projection } from "../Core/Projection";
import { ProjectionStore } from "../Core/ProjectionStore";

export class AllocationProjection extends Projection {
  public static Get(id: any): AllocationProjection {
    return ProjectionStore.Instance.GetProjection(AllocationProjection, id);
  }
  public Amount: number;
  public LedgerId: any;
  public TransactionId: any;
  constructor() {
    super(AllocationProjection.name);
  }
}
