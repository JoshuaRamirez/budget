import { serializable } from "serializr";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class AccountProjection extends Projection {
  public static async Get(id: any): Promise<AccountProjection> {
    const projection = await ProjectionStore.Instance.GetProjection<AccountProjection>(AccountProjection, id);
    return new Promise((resolve, reject) => resolve(projection));
  }

  // Foreign Keys
  @serializable public LedgerId: any = null;
  @serializable public UserId: any = null;

  // Properties
  @serializable public AccountName: string;
  @serializable public Type: string;

  constructor() {
    super(AccountProjection.name);
  }
  public async Project(): Promise<void> {
    await ProjectionStore.Instance.Save(this);
    return new Promise((resolve, reject) => resolve());
  }
  public async Update(): Promise<void> {
    await ProjectionStore.Instance.Update(AccountProjection, this);
    return new Promise((resolve, reject) => resolve());
  }
}
