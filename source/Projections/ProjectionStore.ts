abstract class ProjectionStore<TProjection extends IProjection, TProjectionRequest> {
  public Projections: TProjection[];
  public abstract Project(contract: TProjectionRequest): TProjection;
  public GetById = (id: any) => {
    return this.Projections.find((projection) => projection.Id === id);
  }
}
