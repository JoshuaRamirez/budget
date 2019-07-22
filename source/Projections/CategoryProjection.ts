import { serializable } from "serializr";
import { Projection } from "../Core/Projection";
import { ProjectionStore } from "../Core/ProjectionStore";

export class CategoryProjection extends Projection {
  public static Get(id: any): CategoryProjection {
    return ProjectionStore.Instance.GetProjection(CategoryProjection, id);
  }
  @serializable public CategoryName: string;
  @serializable public Type: string;
  constructor() {
    super(CategoryProjection.name);
  }
  public Project(): void {
    ProjectionStore.Instance.Save(this);
  }
  public Update(): void {
    ProjectionStore.Instance.Update(CategoryProjection, this);
  }
}
