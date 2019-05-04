import { Id } from "./Id";

export abstract class Projection {
  public Id: any;
  public ProjectionName: string;
  protected constructor(projectionName: string) {
    this.Id = Id.Generate();
    this.ProjectionName = projectionName;
  }

}
