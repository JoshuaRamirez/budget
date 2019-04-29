import { IProjection } from "./IProjection";

export abstract class ProjectionStore<TProjection extends IProjection> {
  public Projections: TProjection[] = [];
  public abstract Project(projection: TProjection): void;
  public GetById = (id: any) => {
    return this.Projections.find((projection) => projection.Id === id);
  }
}
