import { IProjection } from "./IProjection";

export abstract class Projection implements IProjection {
  public Id: any;
  public ProjectionName: string;
  protected constructor(projectionName: string) {
    this.Id = Math.random().toString(36).substr(2, 9);
    this.ProjectionName = projectionName;
  }

}
