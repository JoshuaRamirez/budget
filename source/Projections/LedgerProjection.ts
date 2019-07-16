import { Projection } from "../Core/Projection";
import { ProjectionStore } from "../Core/ProjectionStore";

export class LedgerProjection extends Projection {
  public static Get(id: any): LedgerProjection {
    return ProjectionStore.Instance.GetProjection(LedgerProjection, id);
  }
  public Account: any;
  public Balance: number = 0;
  public StartingBalance: number = 0;
  public TransactionIds: any[] = [];
  public Type: string;
  constructor() {
    super(LedgerProjection.name);
  }
}
