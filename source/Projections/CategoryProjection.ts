import { Projection } from "../Core/Projection";
import { ProjectionStore } from "../Core/ProjectionStore";

export class CategoryProjection extends Projection {
  public static Get(id: any): CategoryProjection {
    return ProjectionStore.Instance.GetProjection(CategoryProjection, id);
  }
  public CategoryName: string;
  public Type: string;
  constructor() {
    super(CategoryProjection.name);
  }
}
