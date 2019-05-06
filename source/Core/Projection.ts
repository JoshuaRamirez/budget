import { Id } from "./Id";
import { ProjectionStore } from "./ProjectionStore";

export abstract class Projection {
  public readonly Id: any;
  public readonly ProjectionName: string;
  protected constructor(projectionName: string) {
    this.Id = Id.Generate();
    this.ProjectionName = projectionName;
  }
  public Project(): void {
    ProjectionStore.Instance.Project(this);
  }
}
