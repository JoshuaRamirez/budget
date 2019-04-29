import { ProjectionStore } from "../../Core/ProjectionStore";
import { LedgerProjection } from "./LedgerProjection";

export class LedgerProjectionStore extends ProjectionStore<LedgerProjection> {
  public static Instance: LedgerProjectionStore = new LedgerProjectionStore();
  public Project(projection: LedgerProjection): void {
    projection.Id = Date.now();
    this.Projections.push(projection);
  }

}
