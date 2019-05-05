import { Projection } from "../Core/Projection";
import { ProjectionStore } from "../Core/ProjectionStore";

export class AccountProjection extends Projection {
  public static Get(id: any): AccountProjection {
    return ProjectionStore.Instance.GetProjection(AccountProjection, id);
  }
  public Name: string;
  public Type: string;
  constructor() {
    super(AccountProjection.name);
  }
}
