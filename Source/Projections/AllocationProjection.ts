import { serializable } from "serializr";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class AllocationProjection extends Projection {
  public static Get(id: any): AllocationProjection {
    return ProjectionStore.Instance.GetProjection(AllocationProjection, id);
  }

  // Foreign Keys
  @serializable public LedgerId: any;
  @serializable public TransactionId: any;

  constructor() {
    super(AllocationProjection.name);
  }
  public Project(): void {
    ProjectionStore.Instance.Save(this);
  }
  public Update(): void {
    ProjectionStore.Instance.Update(AllocationProjection, this);
  }
}
