import { serializable } from "serializr";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class TransactionProjection extends Projection {
  public static async Get(id: any): Promise<TransactionProjection> {
    const projection = ProjectionStore.Instance.GetProjection<TransactionProjection>(TransactionProjection, id);
    return new Promise((resolve, reject) => resolve(projection));
  }

  // Foreign Keys
  @serializable public LedgerId: any;

  // Fields
  @serializable public Amount: number;
  @serializable public Destination: any;
  @serializable public Source: any;
  @serializable public Type: string;

  constructor() {
    super(TransactionProjection.name);
  }
  public async Project(): Promise<void> {
    await ProjectionStore.Instance.Save(this);
    return new Promise((resolve, reject) => resolve());
  }
  public async Update(): Promise<void> {
    await ProjectionStore.Instance.Update(TransactionProjection, this);
    return new Promise((resolve, reject) => resolve());
  }
}
