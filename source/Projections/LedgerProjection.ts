import { Projection } from "../Core/Projection";
import { ProjectionStore } from "../Core/ProjectionStore";

export class LedgerProjection extends Projection {
  public static Get(PayeeId: any): LedgerProjection {
    return ProjectionStore.Instance.GetProjection(LedgerProjection, PayeeId);
  }
  public Account: any;
  public Balance: number;
  public TransactionIds: any[];
  public Type: string;
  constructor() {
    super(LedgerProjection.name);
  }
}
