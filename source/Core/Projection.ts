import { Id } from "./Id";
import { ProjectionStore } from "./ProjectionStore";

export abstract class Projection {
  public Id: any;
  public ProjectionName: string;
  protected constructor(projectionName: string) {
    this.Id = Id.Generate();
    this.ProjectionName = projectionName;
  }
  public Project(): void {
    ProjectionStore.Instance.Project(this);
  }
}
