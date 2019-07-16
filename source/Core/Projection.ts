import { Id } from "./Id";
import { ProjectionStore } from "./ProjectionStore";

export abstract class Projection {
  public readonly Id: any;
  public readonly Name: string;
  protected constructor(name: string) {
    this.Id = Id.Generate();
    this.Name = name;
  }
  public Project(): void { // TODO: Rename to Save
    ProjectionStore.Instance.Project(this);
  }
}
