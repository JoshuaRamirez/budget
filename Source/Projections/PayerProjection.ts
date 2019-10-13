import { list, primitive, serializable } from "serializr";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class PayerProjection extends Projection {
  public static Get(id: any): PayerProjection {
    return ProjectionStore.Instance.GetProjection(PayerProjection, id);
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
  public Project(): void {
    ProjectionStore.Instance.Save(this);
  }
  public Update(): void {
    ProjectionStore.Instance.Update(PayerProjection, this);
  }
}
