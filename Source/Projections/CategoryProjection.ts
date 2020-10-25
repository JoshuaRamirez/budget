import { serializable } from "serializr";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class CategoryProjection extends Projection {
  public static async Get(id: any): Promise<CategoryProjection> {
    const projection = await ProjectionStore.Instance.GetProjection<CategoryProjection>(CategoryProjection, id);
    return new Promise((resolve, reject) => resolve(projection));
  }

  // Fields
  @serializable public CategoryName: string;
  @serializable public Type: string;

  constructor() {
    super(CategoryProjection.name);
  }
  public async Project(): Promise<void> {
    await ProjectionStore.Instance.Save(this);
    return new Promise((resolve, reject) => resolve());
  }
  public async Update(): Promise<void> {
    await ProjectionStore.Instance.Update(CategoryProjection, this);
    return new Promise((resolve, reject) => resolve());
  }
}
