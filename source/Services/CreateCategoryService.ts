import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { CategoryRequestedEvent } from "../Events/CategoryRequestedEvent";
import { CategoryProjection } from "../Projections/CategoryProjection";

export class CreateCategoryService implements ISubscriber<CategoryRequestedEvent> {
  public static Instance = new CreateCategoryService();
  public Process(event: CategoryRequestedEvent) {
    const accountProjection = new CategoryProjection();
    accountProjection.CategoryName = event.CategoryName;
    accountProjection.Type = event.Type;
    accountProjection.Project();
  }
  public Subscribe() {
    Publisher.Instance.Subscribe(CategoryRequestedEvent, this);
  }
}
