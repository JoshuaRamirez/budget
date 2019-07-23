import { Handler } from "../../Core/Handler";
import { CategoryRequestedEvent } from "../../Events/CategoryRequestedEvent";
import { CategoryProjection } from "../../Projections/CategoryProjection";

export class CreateCategoryService extends Handler<CategoryRequestedEvent> {
  public static Instance = new CreateCategoryService();
  private constructor() {
    super(CategoryRequestedEvent);
  }
  public Process(event: CategoryRequestedEvent) {
    const accountProjection = new CategoryProjection();
    accountProjection.CategoryName = event.CategoryName;
    accountProjection.Type = event.Type;
    accountProjection.Project();
  }
}
