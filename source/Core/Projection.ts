import { IProjection } from "./IProjection";

export abstract class Projection implements IProjection {
  public Id: any;
  public ProjectionName: string;
  protected constructor(projectionName: string) {
    this.ProjectionName = projectionName;
  }

}
