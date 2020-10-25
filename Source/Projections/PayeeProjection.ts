import { list, primitive, serializable } from "serializr";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class PayeeProjection extends Projection {
  public static async Get(id: any): Promise<PayeeProjection> {
    const projection = await ProjectionStore.Instance.GetProjection<PayeeProjection>(PayeeProjection, id);
    return new Promise((resolve, reject) => resolve(projection));
  }

  // Foreign Keys
  @serializable(list(primitive())) public ExpenseIds: any[] = [];

  // Fields
  @serializable public Description: string;
  @serializable public PayeeName: string;
  @serializable public Type: string;

  constructor() {
    super(PayeeProjection.name);
    this.ExpenseIds = [];
  }
  public async Project(): Promise<void> {
    await ProjectionStore.Instance.Save(this);
    return new Promise((resolve, reject) => resolve());
  }
  public async Update(): Promise<void> {
    await ProjectionStore.Instance.Update(PayeeProjection, this);
    return new Promise((resolve, reject) => resolve());
  }
}
