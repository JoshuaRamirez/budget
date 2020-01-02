import { CategoryRequestedEvent } from "../../Events/Requested/Creation/CategoryRequestedEvent";
import { CategoryProjection } from "../../Projections/CategoryProjection";
import { Handler } from "../Core/Handler";

export class CreateCategoryService extends Handler<CategoryRequestedEvent> {
  public static Instance = new CreateCategoryService();
  private constructor() {
    super(CategoryRequestedEvent);
  }
  public Handle(event: CategoryRequestedEvent) {
    const accountProjection = new CategoryProjection();
    accountProjection.CategoryName = event.CategoryName;
    accountProjection.Type = event.Type;
    accountProjection.Project();
  }
}
