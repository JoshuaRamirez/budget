import { list, primitive, serializable } from "serializr";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class PayeeProjection extends Projection {
  public static Get(id: any): PayeeProjection {
    return ProjectionStore.Instance.GetProjection(PayeeProjection, id);
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
  public Project(): void {
    ProjectionStore.Instance.Save(this);
  }
  public Update(): void {
    ProjectionStore.Instance.Update(PayeeProjection, this);
  }
}
