import { date, serializable } from "serializr";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class ProposedTransactionProjection extends Projection {
  public static async Get(id: any): Promise<ProposedTransactionProjection> {
    const projection = await ProjectionStore.Instance.GetProjection<ProposedTransactionProjection>(ProposedTransactionProjection, id);
    return new Promise((resolve, reject) => resolve(projection));
  }
  public static async All(): Promise<ProposedTransactionProjection[]> {
    const projection = await ProjectionStore.Instance.GetProjections<ProposedTransactionProjection>(ProposedTransactionProjection);
    return new Promise((resolve, reject) => resolve(projection));
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
  public async Project(): Promise<void> {
    await ProjectionStore.Instance.Save(this);
    return new Promise((resolve, reject) => resolve());
  }
  public async Update(): Promise<void> {
    await ProjectionStore.Instance.Update(ProposedTransactionProjection, this);
    return new Promise((resolve, reject) => resolve());
  }
}
