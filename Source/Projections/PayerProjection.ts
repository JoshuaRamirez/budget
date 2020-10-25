import { list, primitive, serializable } from "serializr";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class PayerProjection extends Projection {
  public static async Get(id: any): Promise<PayerProjection> {
    const projection = await ProjectionStore.Instance.GetProjection<PayerProjection>(PayerProjection, id);
    return new Promise((resolve, reject) => resolve(projection));
  }

  // Foreign Keys
  @serializable(list(primitive())) public DepositIds: any[] = [];

  // Fields
  @serializable public Description: string;
  @serializable public PayerName: string;
  @serializable public Type: string;

  constructor() {
    super(PayerProjection.name);
  }
  public async Project(): Promise<void> {
    await ProjectionStore.Instance.Save(this);
    return new Promise((resolve, reject) => resolve());
  }
  public async Update(): Promise<void> {
    await ProjectionStore.Instance.Update(PayerProjection, this);
    return new Promise((resolve, reject) => resolve());
  }
}
