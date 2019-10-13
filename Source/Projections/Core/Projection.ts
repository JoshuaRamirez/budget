import { identifier, serializable } from "serializr";
import { Id } from "./Id";

export abstract class Projection {
  public get Id(): any {
    return this.id;
  }
  @serializable public readonly ProjectionName: string;
  @serializable(identifier()) private id: any;
  protected constructor(name: string) {
    this.id = Id.Generate();
    this.ProjectionName = name;
  }
  public ReplaceId(id: any) {
    this.id = id;
  }
  public abstract Project();
  public abstract Update();
}
