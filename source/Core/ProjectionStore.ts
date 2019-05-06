import { Projection } from "./Projection";

export class ProjectionStore {
  public static Instance = new ProjectionStore();
  private Projections = {};
  public Project<TProjection extends Projection>(projection: TProjection): void {
    if (!this.Projections[projection.Name]) {
      this.Projections[projection.Name] = [];
    }
    this.Projections[projection.Name].push(projection);
  }
  public GetProjection<TProjection extends Projection>(type: (new () => TProjection), id: any): TProjection {
    const name = type.name;
    if (!this.Projections[name]) {
      return undefined;
    }
    return this.Projections[name].find((projection) => projection.Id === id);
  }
  public GetProjections<TProjection extends Projection>(type: (new () => TProjection)): TProjection[] {
    const projectionName = type.name;
    if (!this.Projections[projectionName]) {
      return [];
    }
    return this.Projections[projectionName];
  }
}
