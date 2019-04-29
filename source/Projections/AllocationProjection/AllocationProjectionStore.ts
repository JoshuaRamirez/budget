import { ProjectionStore } from "../../Core/ProjectionStore";
import { AllocationProjection } from "./AllocationProjection";

export class AllocationProjectionStore extends ProjectionStore<AllocationProjection> {
  public static Instance: AllocationProjectionStore = new AllocationProjectionStore();
  public Project(projection: AllocationProjection): void {
    projection.Id = Date.now();
    this.Projections.push(projection);
  }

}
