import { Projection } from "./Projection";

export class ProjectionStore {
  public static Instance = new ProjectionStore();
  private Projections = {};
  public Project<TProjection extends Projection>(projection: TProjection): void {
    projection.Id = Date.now();
    if (!this.Projections[projection.ProjectionName]) {
      this.Projections[projection.ProjectionName] = [];
    }
    this.Projections[projection.ProjectionName].push(projection);
  }
  public GetProjection<TProjection extends Projection>(type: (new () => TProjection), id: any): TProjection {
    const projectionName = type.name;
    if (!this.Projections[projectionName]) {
      return undefined;
    }
    return this.Projections[projectionName].find((projection) => projection.Id === id);
  }
  public GetProjections<TProjection extends Projection>(type: (new () => TProjection)): TProjection[] {
    const projectionName = type.name;
    if (!this.Projections[projectionName]) {
      return undefined;
    }
    return this.Projections[projectionName];
  }
}
