abstract class ProjectionStore<TProjection extends IProjection, TProjectionContract> {
  public Projections: TProjection[];
  public abstract Project(contract: TProjectionContract): TProjection;
  public GetById = (id: any) => {
    return this.Projections.find((projection) => projection.Id === id);
  }
}
