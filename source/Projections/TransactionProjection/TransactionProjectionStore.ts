import { ProjectionStore } from "../../Core/ProjectionStore";
import { TransactionProjection } from "./TransactionProjection";

export class TransactionProjectionStore extends ProjectionStore<TransactionProjection> {
  public static Instance: TransactionProjectionStore = new TransactionProjectionStore();
  public Project(projection: TransactionProjection): void {
    projection.Id = Date.now();
    this.Projections.push(projection);
  }
}
