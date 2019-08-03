import { list, primitive, serializable } from "serializr";
import { Projection } from "../Core/Projection";
import { ProjectionStore } from "../Core/ProjectionStore";

export class LedgerProjection extends Projection {
  public static Get(id: any): LedgerProjection {
    return ProjectionStore.Instance.GetProjection(LedgerProjection, id);
  }
  public static All(): LedgerProjection[] {
    return ProjectionStore.Instance.GetProjections(LedgerProjection);
  }
  @serializable public AccountId: any;
  @serializable public Balance: number = 0;
  @serializable public StartingBalance: number = 0;
  @serializable(list(primitive())) public TransactionIds: any[] = [];
  @serializable public Type: string;
  constructor() {
    super(LedgerProjection.name);
  }
  public Project(): void {
    ProjectionStore.Instance.Save(this);
  }
  public Update(): void {
    ProjectionStore.Instance.Update(LedgerProjection, this);
  }
}
