import { serializable } from "serializr";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class AllocationProjection extends Projection {
  public static async Get(id: any): Promise<AllocationProjection> {
    const projection = await ProjectionStore.Instance.GetProjection<AllocationProjection>(AllocationProjection, id);
    return new Promise((resolve, reject) => resolve(projection));
  }

  // Foreign Keys
  @serializable public LedgerId: any;
  @serializable public TransactionId: any;

  constructor() {
    super(AllocationProjection.name);
  }
  public async Project(): Promise<void> {
    await ProjectionStore.Instance.Save(this);
    return new Promise((resolve, reject) => resolve());
  }
  public async Update(): Promise<void> {
    await ProjectionStore.Instance.Update(AllocationProjection, this);
    return new Promise((resolve, reject) => resolve());
  }
}
