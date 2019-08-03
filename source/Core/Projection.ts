import { identifier, serializable } from "serializr";
import { Id } from "./Id";
import { User } from "./User";

export abstract class Projection {
  @serializable(identifier()) public readonly Id: any;
  @serializable public readonly Name: string;
  protected constructor(name: string) {
    this.Id = Id.Generate();
    this.Name = name;
  }
  public abstract Project();
  public abstract Update();
}
