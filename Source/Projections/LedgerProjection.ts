import { list, primitive, serializable } from "serializr";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class LedgerProjection extends Projection {
  public static async Get(id: any): Promise<LedgerProjection> {
    const projection = await ProjectionStore.Instance.GetProjection<LedgerProjection>(LedgerProjection, id);
    return new Promise((resolve, reject) => resolve(projection));
  }
  public static async All(): Promise<LedgerProjection[]> {
    const projection = await ProjectionStore.Instance.GetProjections<LedgerProjection>(LedgerProjection);
    return new Promise((resolve, reject) => resolve(projection));
  }

  // Foreign Keys
  @serializable public AccountId: any;
  @serializable(list(primitive())) public TransactionIds: any[] = [];

  // Fields
  @serializable public Balance: number = 0;
  @serializable public StartingBalance: number = 0;
  @serializable public Type: string;

  constructor() {
    super(LedgerProjection.name);
  }
  public async Project(): Promise<void> {
    await ProjectionStore.Instance.Save(this);
    return new Promise((resolve, reject) => resolve());
  }
  public async Update(): Promise<void> {
    await ProjectionStore.Instance.Update(LedgerProjection, this);
    return new Promise((resolve, reject) => resolve());
  }
}
