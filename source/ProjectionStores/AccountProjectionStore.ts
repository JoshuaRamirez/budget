import { ProjectionStore } from "../Core/ProjectionStore";
import { AccountProjection } from "../Projections/AccountProjection";

export class AccountProjectionStore extends ProjectionStore<AccountProjection> {
  public static Instance: AccountProjectionStore = new AccountProjectionStore();
  public Project(projection: AccountProjection): void {
    projection.Id = Date.now();
    this.Projections.push(projection);
  }

}
