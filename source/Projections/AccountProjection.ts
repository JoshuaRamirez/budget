import { serializable } from "serializr";
import { Projection } from "../Core/Projection";
import { ProjectionStore } from "../Core/ProjectionStore";

export class AccountProjection extends Projection {
  public static Get(id: any): AccountProjection {
    return ProjectionStore.Instance.GetProjection(AccountProjection, id);
  }

  // Foreign Keys
  @serializable public LedgerId: any;
  @serializable public UserId: any;

  // Properties
  @serializable public AccountName: string;
  @serializable public Type: string;

  constructor() {
    super(AccountProjection.name);
  }
  public Project(): void {
    ProjectionStore.Instance.Save(this);
  }
  public Update(): void {
    ProjectionStore.Instance.Update(AccountProjection, this);
  }
}
