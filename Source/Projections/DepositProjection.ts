import { serializable } from "serializr";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class DepositProjection extends Projection {
  public static async Get(id: any): Promise<DepositProjection> {
    const projection = ProjectionStore.Instance.GetProjection<DepositProjection>(DepositProjection, id);
    return new Promise((resolve, reject) => resolve(projection));
  }

  // Foreign Keys
  @serializable public CategoryId: string;
  @serializable public LedgerId: any;
  @serializable public PayerId: any;
  @serializable public PlannedDepositId: any;
  @serializable public TransactionId: any;

  // Fields
  @serializable public Amount: number;
  @serializable public Description: string;

  constructor() {
    super(DepositProjection.name);
  }
  public async Project(): Promise<void> {
    await ProjectionStore.Instance.Save(this);
    return new Promise((resolve, reject) => resolve());
  }
  public async Update(): Promise<void> {
    await ProjectionStore.Instance.Update(DepositProjection, this);
    return new Promise((resolve, reject) => resolve());
  }
}
