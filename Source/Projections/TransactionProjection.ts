import { serializable } from "serializr";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class TransactionProjection extends Projection {
  public static Get(id: any): TransactionProjection {
    return ProjectionStore.Instance.GetProjection(TransactionProjection, id);
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
  public Project(): void {
    ProjectionStore.Instance.Save(this);
  }
  public Update(): void {
    ProjectionStore.Instance.Update(TransactionProjection, this);
  }
}
