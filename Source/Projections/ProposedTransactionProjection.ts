import { date, serializable } from "serializr";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class ProposedTransactionProjection extends Projection {
  public static Get(id: any): ProposedTransactionProjection {
    return ProjectionStore.Instance.GetProjection(ProposedTransactionProjection, id);
  }
  public static All(): ProposedTransactionProjection[] {
    return ProjectionStore.Instance.GetProjections(ProposedTransactionProjection);
  }

  // Fields
  @serializable(date()) public Date: Date;
  @serializable public Amount: number;
  @serializable public Description: string;
  @serializable public PlannedTransactionId: any;
  @serializable public TransactionType: string;

  constructor() {
    super(ProposedTransactionProjection.name);
  }
  public Project(): void {
    ProjectionStore.Instance.Save(this);
  }
  public Update(): void {
    ProjectionStore.Instance.Update(ProposedTransactionProjection, this);
  }
}
